import React from 'react';
import { View, Text } from "react-native";
import Immutable from 'Immutable';
import { Font } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";
import AuthContainer from '../Auth/_containers/AuthContainer'
import ProfileContainer from '../Profile/_containers/ProfileContainer'
import ChatListContainer from '../Chat/_containers/ChatListContainer'


class Home extends React.Component {

    componentWillMount() {

    }

    render() {
        return  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Home Screen yay 11 fast</Text>
        </View>
    }
}

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        Profile: {
            screen: ProfileContainer,
            navigationOptions: {
                // header: null,
            }
        },
        Login: AuthContainer,
        Chat: ChatListContainer
    },
    {
        initialRouteName: "Login"
    }
);

export default createAppContainer(AppNavigator);