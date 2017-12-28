import React, { Component } from 'react';
import { connect } from 'react-redux';

export class NavItem extends Component {
    render() {
        this.navs = [{
            type: 'artists',
            run: () => {
                this.props.data.reveal('artists');
            }
        }, {
            type: 'albums',
            run: () => {
                this.props.data.reveal('albums');
            }
        }, {
            type: 'tracks',
            run: () => {
                this.props.data.reveal('tracks');
            }
        }, {
            type: 'search',
            run: () => {
                this.props.data.reveal('search');
            }
        }];
        
        return this.navs.map(nav => 
            <li 
                onClick={() => nav.run()}
                className="nav-li"
                key={nav.type}>
                {nav.type}
            </li>
        );
    }
}

export default connect(
    (state) => (state),
)(NavItem);