import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Launch from './components/Launch';
import SignIn from './components/SignIn';

class App extends Component {
    render() {
        return (
            <SignIn />
        );
    }
}

export default connect(
    (state) => (state)
)(App);