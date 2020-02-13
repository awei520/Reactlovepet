
import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import './nav2.css'

import {withRouter} from "react-router-dom";
class Nav extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
        };
    }

    render() {
        return <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.push({pathname: '/share'})}
      >{this.props.location.query&&this.props.location.query.title}</NavBar>
    }
}
export default withRouter(Nav)