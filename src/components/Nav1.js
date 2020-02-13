import React from 'react'
import { Popover, NavBar, Icon } from 'antd-mobile';
import add from '../static/images/add.jpg'
import './nav2.css'
import {withRouter} from "react-router-dom";
const Item = Popover.Item;
class Nav extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: true,
            selected: '',
        };
    }
    onSelect = (opt) => {
        // console.log(opt.props.value);
        this.setState({
          visible: false,
          selected: opt.props.value,
        });
      };
      handleVisibleChange = (visible) => {
        this.setState({
          visible,
        });
      };
    render() {
        return <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.go(-1)}
        rightContent={<Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (<Item key="4" value="add" icon={<img src={add}/>} >点击分享</Item>)
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>}
      >{this.props.location.query&&this.props.location.query.title}</NavBar>
    }
}
export default withRouter(Nav)








