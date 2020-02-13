import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import './nav2.css'

import {withRouter} from "react-router-dom";
class Nav extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
           
        };
    }

    render() {
        return <NavBar
        mode="light"
        // icon={<Icon type="left" />}
        // onLeftClick={() => this.props.history.go(-1)}
      >宠物社区</NavBar>
    }
}
export default withRouter(Nav)