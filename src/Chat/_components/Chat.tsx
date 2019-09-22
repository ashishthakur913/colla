import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, KeyboardAvoidingView, TouchableOpacity, Platform, Linking } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import "prop-types";
import Centrifuge from "centrifuge";

const styles = StyleSheet.create({
    mapView: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
    },
});


export default class Chat extends Component {
    state = {
        messages: [],
    };
    private subscription;

    openMapAsync = async (location) => {
        const url = Platform.select({
            ios: `http://maps.apple.com/?ll=${location.latitude},${
                location.longitude
                }`,
            default: `http://maps.google.com/?q=${location.latitude},${
                location.longitude
                }`,
        })

        try {
            const supported = await Linking.canOpenURL(url)
            if (supported) {
                return Linking.openURL(url)
            }
            alert('Opening the map is not supported.')
        } catch ({ message }) {
            alert(message)
        }
    }

    componentDidMount() {
        this.startChatBot();
    }

    renderCustomView = (props) => {
        if (props.currentMessage.location) {
            return (
                <TouchableOpacity
                    onPress={() => this.openMapAsync(props.currentMessage.location)}
                >
                    <MapView
                        style={[styles.mapView]}
                        region={{
                            latitude: props.currentMessage.location.latitude,
                            longitude: props.currentMessage.location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                    />
                </TouchableOpacity>
            );
        }
        return null
    }

    private startChatBot() {
        let centrifuge = new Centrifuge('ws://192.168.2.27:8000/connection/websocket');
        centrifuge.setToken(this.props.auth.getIn(['chatToken']));


        var publishHandlerFunction = (function(messages) {
            this.onRecieve(messages.data);
        }).bind(this);

        this.subscription = centrifuge.subscribe("news");
        this.subscription.on("publish", publishHandlerFunction);
        centrifuge.connect();
    }

    private publishMessage(message) {
        this.subscription.publish(message).then(function(success) {
            // success
        }, function(err) {
            // error
        });
    }

    private onRecieve(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    private onSend(messages = []) {
        this.publishMessage(messages);
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {
        return (
            <>
                {this.state.messages.length === 0 && (
                    <View style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            bottom: 50
                        }]}>
                        <Image
                            source={{ uri: 'https://i.stack.imgur.com/qLdPt.png' }}
                            style={{
                                ...StyleSheet.absoluteFillObject,
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                )}
                <View style={{ flex: 1 }} >
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={(messages) => this.onSend(messages)}
                        renderCustomView={this.renderCustomView}
                        user={{
                            _id: 1,
                        }}
                        parsePatterns={linkStyle => [
                            {
                                pattern: /#(\w+)/,
                                style: { color: 'lightgreen' },
                                onPress: props => alert(`press on ${props}`),
                            },
                        ]}
                    />
                    <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80} />
                </View>
            </>
        );
    }
}
