import React, {Component} from 'react';
import Home from '../_components/Home'
import {connect} from 'react-redux';
import { fetchUserToken } from '../Auth/_actions/AuthActions'

const mapStateToProps = ()=>{
    return {};
};

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);