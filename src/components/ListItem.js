import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ListItem extends Component {
    render() {
        if (this.props.selected === 'artists') {
            return (
                <li>Artists Info</li>
            );
        } else if (this.props.selected === 'albums') {
            return (
                <li>Albums Info</li>
            );
        } else if (this.props.selected === 'tracks') {
            return (
                <li>Tracks Info</li>
            );
        } else {
            return (
                <li>No Info</li>
            );
        }

    }
}

export default connect(
    (state) => (state)
)(ListItem)