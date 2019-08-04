import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auth from '../_components/Auth'
import { verifyUserToken, login } from '../_actions/AuthActions'
import Store from '../../_stores/Store';

const mapStateToProps = (store: Store)=>{
    const toast = store.getIn(['UIData', 'toast']);
    const auth = store.getIn(['Auth']);
    return {
        toast: toast,
        auth: auth
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        verifyUserToken: (token: string) => dispatch(verifyUserToken(token)),
        login: (loginCredentials: loginCredentials) => dispatch(login(loginCredentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);