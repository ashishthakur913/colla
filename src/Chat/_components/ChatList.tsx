import * as Immutable from 'immutable';
import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import {Container, Text, Thumbnail, List, ListItem, Left, Right, Body} from 'native-base';

type Props = {
}

type State = {

}

export default class ChatList extends Component<Props, State> {
    static defaultProps = {};
    state = {} as State;

    componentWillMount () {
        this.props.getFriends()
    }

    render() {
        return <Container>
            <List>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={require('./../../../assets/images/woman-avatar.png')} />
                    </Left>
                    <Body>
                    <Text>Ashish Kanwar</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                        <Text note>3:43 pm</Text>
                    </Right>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={require('./../../../assets/images/woman-avatar.png')} />
                    </Left>
                    <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                        <Text note>3:43 pm</Text>
                    </Right>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={require('./../../../assets/images/woman-avatar.png')} />
                    </Left>
                    <Body>
                    <Text>Priyanka Thakur</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                        <Text note>3:43 pm</Text>
                    </Right>
                </ListItem>
            </List>
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