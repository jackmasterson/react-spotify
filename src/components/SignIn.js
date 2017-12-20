import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignIn extends Component {
    render() {
        return(
            <div>Sign In Occurring</div>
        );
    }
}

export default connect(
    (state) => (state)
)(SignIn);