import React, { Component } from 'react';
import { connect } from 'react-redux';

import {ListWrapper} from './ListWrapper';
import {NavWrapper} from './NavWrapper';
import {SidebarWrapper} from './SidebarWrapper';

class Launch extends Component {
    render() {
        return (
            <div>
                <NavWrapper />
                <ListWrapper
                    selected={this.props.queried.state[0].selected}
                />
                <SidebarWrapper/>
            </div>
        )
    }
}

export default connect(
    (state) => (state)
)(Launch);