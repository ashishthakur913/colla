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

export default class ChatList extends Component<Props, State> {
    static defaultProps = {};
    state = {} as State;

    render() {App.tsx
        return <Container>
            <Grid>
                <Row size={30} style={styles.profileHeader} >
                    <ImageBackground source={require('./../../../assets/images/man-avatar.png')} style={styles.avatarContainer}>
                        <Row style={styles.avatarText}>
                            <Icon name="plus" size={15} style={styles.avatarIcon} />
                            <Text style={{color: 'white'}} >Add photo</Text>
                        </Row>
                    </ImageBackground>
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