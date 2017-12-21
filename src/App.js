import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Launch from './components/Launch';

class App extends Component {
    render() {
        return (
            <Launch />
        );
    }
}

export default connect(
    (state) => (state)
)(App);