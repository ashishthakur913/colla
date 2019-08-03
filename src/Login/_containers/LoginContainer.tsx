import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from '../_components/Login'
import { verifyUserToken, login } from './../_actions/LoginActions'
import Store from '../../_stores/Store';

const mapStateToProps = (store: Store)=>{
    const toast = store.getIn(['UIData', 'toast']);
    console.log(toast, "--toast");
    return {
        toast: toast
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        verifyUserToken: (token: string) => dispatch(verifyUserToken(token)),
        login: (loginCredentials: loginCredentials) => dispatch(login(loginCredentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);