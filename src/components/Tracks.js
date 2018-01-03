import React, {Component} from 'react';
import { connect } from 'react-redux';

export class Tracks extends Component {
    render() {
        return this.props.retrievedFromDatabase.map(res => {
            return (
                <div
                    key={res.id}>
                    <div>{res.artist}</div>
                    <div>{res.album}</div>
                    <div>{res.name}</div>
                </div>
            );
        });
    }
}

export default connect(
    (state) => (state)
)(Tracks);