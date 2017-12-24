import React, { Component } from 'react';
import { connect } from 'react-redux';

export class NavItem extends Component {
    render() {
        this.navs = [{
            type: 'my artists',
        }, {
            type: 'my albums'
        }, {
            type: 'my tracks'
        }, {
            type: 'search'
        }]
        
        return this.navs.map(nav => 
            <li 
                className="nav-li"
                key={nav.type}>
                {nav.type}</li>
        );
    }
}