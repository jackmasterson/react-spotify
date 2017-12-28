import React, { Component } from 'react';
import { connect } from 'react-redux';

import {ListWrapper} from './ListWrapper';
import {NavWrapper} from './NavWrapper';
import {SidebarWrapper} from './SidebarWrapper';

import {
    reveal, 
    getSearch, 
    saveToDatabase, 
    getDatabaseData,
} from '../actions/query-action';

class Launch extends Component {
    componentDidMount() {
        let split = window.location.href.split('#access_token=')[1];
        let accessToken = split.split('&')[0];
        sessionStorage.setItem('auth', accessToken);
        let userId;
        fetch('https://api.spotify.com/v1/me', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            // userId = res.id;
        })
        .catch((err) => {
            throw new Error(err);
        })
    }
    render() {
        return (
            <div>
                <div className="non-sidebar">
                    <NavWrapper
                        data={this.props}
                        reveal={this.props.reveal}
                    />
                    <ListWrapper
                        selected={this.props.queried.selected}
                        getSearch={this.props.getSearch}
                        response={this.props.queried}
                        saveToDatabase={this.props.saveToDatabase}
                        retrievedFromDatabase={this.props.queried.retrieved}
                    />
                </div>
                <SidebarWrapper/>
            </div>
        )
    }
}

export default connect(
    (state) => (state),
    {
        reveal, 
        getSearch,
        saveToDatabase,
        getDatabaseData,
    }
)(Launch);