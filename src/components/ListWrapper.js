import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ListItem} from './ListItem';

export class ListWrapper extends Component {
    render() {
        return (
            <ul>
                <ListItem />
            </ul>
        );
    }
}

export default connect(
    (state) => (state)
)(ListWrapper);