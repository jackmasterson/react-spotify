import React, { Component } from 'react';
import { connect } from 'react-redux';

import {NavItem} from './NavItem';

export class NavWrapper extends Component {
    render() {
        return (
            <ul className="nav-ul">
                <NavItem />
            </ul>
        )
    }
}

export default connect(
    (state) => (state)
)(NavWrapper);