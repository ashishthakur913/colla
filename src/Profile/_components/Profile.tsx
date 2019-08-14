import * as Immutable from 'immutable';
import React, { Component } from 'react';
import { View, ListView, Image, StyleSheet, ImageBackground } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import {Container, Text, Thumbnail, Content, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IAuth} from "../../Auth/_stores/AuthStore";
import Centrifuge from 'centrifuge';

type Props = {
    auth:  Immutable.Record<IAuth>,
}

type State = {

}

export default class Profile extends Component<Props, State> {
    static defaultProps = {}
    state = {} as State

    private subscription;

    private openChat() {
        this.props.navigation.navigate('Chat')
    }

    private startChatBot() {
        let centrifuge = new Centrifuge('ws://192.168.2.27:8000/connection/websocket');
        centrifuge.setToken(this.props.auth.getIn(['chatToken']));


        var callbacks = {
            "publish": function(message) {
                // See below description of message format
                console.log(message, "----1");
                alert(message.data.text);
            },
            "join": function(message) {
                // See below description of join message format
                console.log(message);
            },
            "leave": function(message) {
                // See below description of leave message format
                console.log(message);
            },
            "subscribe": function(context) {
                // See below description of subscribe callback context format
                console.log(context);
            },
            "error": function(errContext) {
                // See below description of subscribe error callback context format
                console.log(errContext);
            },
            "unsubscribe": function(context) {
                // See below description of unsubscribe event callback context format
                console.log(context);
            }
        }

        this.subscription = centrifuge.subscribe("news", callbacks);
        centrifuge.connect();
    }

    private sendMessage() {
        this.subscription.publish({"text": "hello world"}).then(function(success) {
            console.log(success, "---success");
        }, function(err) {
            console.log(err, "---err");
        });
    }

    render() {
        this.startChatBot();
        const uri = '';
        return <Container>
            <Grid>
                <Row size={30} style={styles.profileHeader} >
                    <ImageBackground source={require('./../../../assets/images/man-avatar.png')} style={styles.avatarContainer}>
                        <Row style={styles.avatarText}>
                            <Icon name="plus" size={15} style={styles.avatarIcon} />
                            <Text style={{color: 'white'}} >Add photo</Text>
                        </Row>
                    </ImageBackground>
                    <Text style={styles.username} >{this.props.auth.getIn(['username'])}</Text>

                    <Button onPress={this.openChat.bind(this)} ><Text>Chat</Text></Button>
                    <Button onPress={this.sendMessage.bind(this)} ><Text>Send message</Text></Button>
                </Row>
                <Row size={70} >
                </Row>
            </Grid>
        </Container>
    }
}

const styles = StyleSheet.create({
    profileHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    avatarContainer: {
        // flex: 1,
        // flexDirection: 'row',
        tintColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        height: 150,
        width: 150,
        borderRadius: 100,
        position: 'relative'
    },
    avatarText: {
        position: 'absolute',
        top: 100,
        color: 'white'
    },
    avatarIcon: {
        color: 'white',
        lineHeight: 20,
        marginRight: 5
    },
    username: {
        marginTop: 10,
        fontSize: 25
    }
});