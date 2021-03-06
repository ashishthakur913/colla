import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chat from '../_components/Chat'
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
        // login: (loginCredentials: loginCredentials) => dispatch(login(loginCredentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);