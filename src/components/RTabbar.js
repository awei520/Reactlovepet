import React from 'react'
import { TabBar } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import '../static/css/font.css'
class Rtab extends React.Component {
    constructor(props){
        super(props)
        this.state={
            selectedTab: 'home',
            hidden: false,            
        }
    }


    render(){
        return (<div className='coverbar'>
          <div className='gaosibar'></div>
          <TabBar
          unselectedTintColor="#949494"   //没有选中的文字颜色
            tintColor="#f2473d"    //选中的文字颜色
            barTintColor="rgba(255,255,255,0.7)"   //tabar的背景色
            hidden={this.state.hidden}  //控制tabbar是否要隐藏
        >
          <TabBar.Item
            title="主页"
            key="home"
            icon={<div style={{
              fontFamily: 'icomoon',
              fontSize: '18px',
              width: '22px',
              height: '22px',
               }} className="icon-tablet"
            />
            }
            selectedIcon={<div style={{
              fontFamily: 'icomoon',
              fontSize: '18px',
              width: '22px',
              height: '22px',
              }} className="icon-tablet"
            />
            }
            selected={this.state.selectedTab === 'home'}    
            onPress={() => {
              
              this.setState({
                selectedTab: 'home',
                
              });
              this.props.history.push('/')
            }}
            
          >
           
          </TabBar.Item>         
          <TabBar.Item
            icon={
              <div style={{
                fontFamily:'icomoon',
                fontSize: '18px',
                width: '22px',
                height: '22px',
                }} className="icon-star"
              />
            }
            selectedIcon={
              <div style={{
                fontFamily:'icomoon',
                fontSize: '18px',
                width: '22px',
                height: '22px',
                }} className="icon-star"
              />
            }
            title="分享"
            key="share"
    
            selected={this.state.selectedTab === 'share'}
            onPress={() => {
              
              this.setState({
                selectedTab: 'share',
              });
              this.props.history.push('/share')
            }}
          >
           
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                  fontFamily: 'icomoon',
                  fontSize: '18px',
                  width: '22px',
                  height: '22px',
              }} className="icon-user"
              />
          }
          selectedIcon={
              <div style={{
                  fontFamily: 'icomoon',
                  fontSize: '18px',
                  width: '22px',
                  height: '22px',
              }} className="icon-user"
              />
          }
            title="我的"
            key="user"
            selected={this.state.selectedTab === 'user'}
            onPress={() => {
              
              this.setState({
                selectedTab: 'user',
              });
              this.props.history.push('/user')
            }}
          >
           
          </TabBar.Item>
        </TabBar>
        </div>
        )
    }
}
export default withRouter(Rtab)