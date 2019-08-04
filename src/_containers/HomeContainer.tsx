import React, {Component} from 'react';
import Home from '../_components/Home'
import {connect} from 'react-redux';
import { fetchUserToken } from '../Auth/_actions/AuthActions'

const mapStateToProps = (state)=>{
    return {
        title: state.title,
        subtitle: state.subtitle
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        increment: () => dispatch(fetchUserToken),
        decrement: () => dispatch({ type: 'DECREMENT' }),
        reset: () => dispatch({ type: 'RESET' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);