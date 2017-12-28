import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Artists } from '../components/Artists';
import { Albums } from '../components/Albums';
import { Tracks } from '../components/Tracks';
import { GenericResponse } from '../components/GenericResponse';

export class ListItem extends Component {
    onPress() {
        let name = document.querySelector('#search-name').value;
        let type = document.querySelector('#search-type').value;
        this.type = type;
        this.props.getSearch(name, type)
    }
    render() {
        if (this.props.selected === 'artists') {
            return (
                <Artists
                    retrievedFromDatabase={this.props.retrievedFromDatabase}
                />
            );
        } else if (this.props.selected === 'albums') {
            return (
                <Albums
                    retrievedFromDatabase={this.props.retrievedFromDatabase}
                />
            );
        } else if (this.props.selected === 'tracks') {
            return (
                <Tracks
                    retrievedFromDatabase={this.props.retrievedFromDatabase}
                />
            );
        } else if (this.props.selected === 'search') {
            return (
                <div>
                    <select id="search-type">
                        <option value="track">Track</option>
                        <option value="album">Album</option>
                        <option value="artist">Artist</option>
                    </select>
                    <input 
                        id="search-name"
                        placeholder="Name"/>
                    <button 
                        onClick={() => this.onPress()}
                        id="search-button">Search</button>
                </div>
            )
        } else if (this.props.selected === '' && this.props.response) {
            return (
                <div>
                    <GenericResponse 
                        response={this.props.response}
                        type={this.type}
                        saveToDatabase={this.props.saveToDatabase}
                    />
                </div>
            )
        } else {
            return (
                <li>Loading</li>
            )
        }
    }
}

export default connect(
    (state) => (state)
)(ListItem)