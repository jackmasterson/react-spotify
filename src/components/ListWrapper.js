import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ListItem} from './ListItem';

export class ListWrapper extends Component {
    render() {
        return (
            <ul>
                <ListItem 
                    selected={this.props.selected}
                    getSearch={this.props.getSearch}
                    response={this.props.response.response}
                    saveToDatabase={this.props.saveToDatabase}
                    retrievedFromDatabase={this.props.retrievedFromDatabase}
                />
            </ul>
        );
    }
}

export default connect(
    (state) => (state)
)(ListWrapper);