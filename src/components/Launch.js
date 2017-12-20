import React, { Component }from 'react';
import { connect } from 'react-redux';

class Launch extends Component {
    render() {
        return (
            <div>Hello world!</div>
        )
    }
}

export default connect(
    (state) => (state)
)(Launch);