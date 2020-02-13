import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import './nav2.css'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";
import {loginout} from '../actions/action'
class Nav extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
        };
    }
   out=()=>{
    const loginout =this.props.loginout
    loginout()
    this.props.history.push({pathname:'/userblank'})
   }
    render() {
        return (this.props.flag==true?<NavBar
        mode="light"
        rightContent={[
            <span onClick={this.out}>退出</span>
          ]}
      >用户信息</NavBar>:<NavBar
      mode="light"
      // icon={<Icon type="left" />}
      // onLeftClick={() => this.props.history.go(-1)}
    >用户信息</NavBar>)
    }
}
//使用connect组件连接redux和当前组件
const mapStatetoProps = (state) => {
    return { flag: state.login.flag, user: state.login.user }
}
const mapDispatchToProps = { loginout }
// export default withRouter(Login)
export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(Nav));