import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, KeyboardAvoidingView, TouchableOpacity, Platform, Linking } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import "prop-types";

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

    componentWillMount() {
        // if(!this.state.messages.length) {
        //     this.setState({ messages:  [
        //             {
        //                 _id: Math.round(Math.random() * 1000000),
        //                 text: '0 message',
        //                 createdAt: new Date(),
        //                 system: true
        //             }]})
        // }
        // this.setState({ messages:  [
        //         {
        //             _id: Math.round(Math.random() * 1000000),
        //             text: '#awesome',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 1,
        //                 name: 'Developer',
        //             },
        //         },
        //         {
        //             _id: Math.round(Math.random() * 1000000),
        //             text: '',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: 'React Native',
        //             },
        //             image: 'http://www.pokerpost.fr/wp-content/uploads/2017/12/iStock-604371970-1.jpg',
        //             sent: true,
        //             received: true,
        //         },
        //         {
        //             _id: Math.round(Math.random() * 1000000),
        //             text: 'Send me a picture!',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 1,
        //                 name: 'Developer',
        //             },
        //         },
        //         {
        //             _id: Math.round(Math.random() * 1000000),
        //             text: '',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: 'React Native',
        //             },
        //             sent: true,
        //             received: true,
        //             location: {
        //                 latitude: 45.537826,
        //                 longitude: -73.556170
        //             },
        //         },
        //         {
        //             _id: Math.round(Math.random() * 1000000),
        //             text: 'Where are you?',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 1,
        //                 name: 'Developer',
        //             },
        //         },
        //         {
        //             _id: Math.round(Math.random() * 1000000),
        //             text: 'Yes, and I use Gifted Chat!',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: 'React Native',
        //             },
        //             sent: true,
        //             received: true
        //         },
        //         {
        //             _id: Math.round(Math.random() * 1000000),
        //             text: 'Are you building a chat app?',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 1,
        //                 name: 'Developer',
        //             },
        //         },
        //         {
        //             _id: Math.round(Math.random() * 1000000),
        //             text: "You are officially rocking GiftedChat.",
        //             createdAt: new Date(),
        //             system: true,
        //         },
        //     ]});
    }

    onSend(messages = []) {
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