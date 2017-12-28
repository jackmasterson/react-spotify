import React, {Component} from 'react';
import { connect } from 'react-redux';

export class Albums extends Component {
    render() {
        return this.props.retrievedFromDatabase.map(res => {
            return (
                <div
                    key={res.album}>
                    <div>{res.artist}</div>
                    <div>{res.album}</div>
                </div>
            );
        });
    }
}

export default connect(
    (state) => (state)
)(Albums);