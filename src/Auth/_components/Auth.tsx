import * as Immutable from 'immutable';
import React, { Component } from 'react';
import { View, ListView, Image, StyleSheet, Alert } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Text, Thumbnail, Item, Input, Icon, Button  } from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage } from 'react-native';
import { MapView } from 'expo';
import { _retrieveAndVerifyUserToken } from '../../Common/_util/AsyncStorage';
import Toast, {DURATION} from 'react-native-easy-toast';
import {IToast} from '../../UIData/_stores/UIToastStore'
import {IAuth} from '../../Auth/_stores/AuthStore'

type Props = {
    navigation: Object,
    verifyUserToken: Function,
    login: Function,
    toast: Immutable.Record<IToast>,
    auth:  Immutable.Record<IAuth>,
}

type State = {
    password: string,
    email: string,
    tokenExists: boolean,
    loggedIn: boolean
}

export default class Auth extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.toast = null
    }
    private toast;

    static defaultProps = {
        auth: Immutable.Record<IAuth>({
            userName: '',
            isLoggedIn: false
        })
    }

    state = {
        password: '',
        email: '',
        tokenExists: true,
        loggedIn: false,
    } as State

    componentDidMount() {
        if (!this.props.auth.getIn(['isLoggedIn'])) {
            _retrieveAndVerifyUserToken(this.props.verifyUserToken, () => {
                this.setState({tokenExists: false})
            })
        }
    }

    componentDidUpdate(previousProps: Props, nextProps: Props) {
        if (this.props.auth.getIn(['isLoggedIn'])) {
            this.props.navigation.navigate('Profile')
        }

        let toastOpen = this.props.toast.getIn(['toastOpen']);
        if (toastOpen) {
            Alert.alert(
                'That did not work ',
                this.props.toast.getIn(['toastMessage']),
                [
                    {text: 'OK'},
                ],
                {cancelable: true},
            );
        }
    }

    private login() {
        this.props.login({
            user: {
                email: this.state.email,
                password: this.state.password
            }
        });
    }

    private setEmail = (email: string) => this.setState({email: email})
    private setPassword = (password: string) => this.setState({password: password})

    render() {
        return <Container>
            <Grid>
                <Row size={40} >
                    <View style={styles.container}>
                        <Thumbnail square source={require('./../../../assets/images/logo.png')} />
                        <Text style={styles.logoText} >Collab</Text>
                    </View>
                </Row>
                <Row size={40} >
                    <View style={styles.inputContent}>
                        <Item style={styles.inputItem} >
                            <Icon active name='person' />
                            <Input
                                value={this.state.email}
                                onChangeText={(email) => this.setEmail(email)}
                                placeholder='Email address'/>
                        </Item>
                        <Item style={styles.inputItem} >
                            <Icon active name='key' />
                            <Input
                                value={this.state.password}
                                onChangeText={(password) => this.setPassword(password)}
                                secureTextEntry={true}
                                placeholder='Password'/>
                        </Item>
                        <Button style={styles.signupButton} rounded>
                            <Text onPress={this.login.bind(this)} style={styles.signupButtonText} >Login</Text>
                        </Button>
                    </View>
                </Row>
                <Row size={20} >
                    <View style={styles.container}>
                        <Text style={styles.notAMemberText} >Not a member yet?</Text>
                        <Text style={styles.registerText} >Register</Text>
                    </View>
                </Row>
            </Grid>
            <Toast
                ref={toast => {
                    this.toast = toast;
                }}
                style={{backgroundColor:'grey'}}
                position='bottom'
                positionValue={200}
                fadeInDuration={300}
                fadeOutDuration={300}
                opacity={0.8}
                textStyle={{color:'#000'}}
            />
        </Container>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 25,
        paddingTop: 10
    },
    registerText: {
        fontSize: 20,
        paddingTop: 5,
        color: '#00b386',
    },
    notAMemberText: {
        fontSize: 15,
        color: '#aba9a9',
    },
    inputContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingLeft: 30,
        paddingRight: 30,
    },
    inputItem: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#f3f3f38c',
        borderRadius: 4,
        marginTop: 5
    },
    signupButton: {
        backgroundColor: '#00b386',
        paddingLeft: 40,
        paddingRight: 40,
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 20
    },
    signupButtonText: {
        fontSize: 20
    }
});