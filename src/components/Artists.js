import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Artists extends Component {
    render() {
        return this.props.retrievedFromDatabase.map(res => {
            return (
                <div
                    key={res.artist}>
                    <div>{res.artist}</div>
                </div>
            );
        });
    }
}

export default connect(
    (state) => (state)
)(Artists);