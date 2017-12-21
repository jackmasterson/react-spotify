import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SidebarItem } from './SidebarItem';

export class SidebarWrapper extends Component {
    render() {
        return (
            <SidebarItem/>
        )
    }
}

export default connect(
    (state) => (state)
)(SidebarWrapper);