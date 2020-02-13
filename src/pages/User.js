import React from 'react'
import './User.css'
import { Button, PullToRefresh } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginin, loginout } from '../actions/action'
import Zmage from 'react-zmage'
import { fetchget } from '../utils/myfetch'
class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            down: true,
            noget:false
        }
    }
    componentDidMount() {
    }
    getcomments = async (uid) => {
        let data = await fetchget('/api/getusercom/' + uid)
        console.log(data)
        if (data.status == 1) {
            this.setState({
                noget: true
            })
        } else {
            this.setState({
                list: [...data.message],
                noget:false
            })
        }
    }
    getcom = (uid) => {
        this.getcomments(uid)

    }
    getmycomments = () => {

        return (<div className='sharelist'>
           
                {this.state.list.map((item, idx) => {
                    return (<div className='headimg' key={idx}>
                        <Zmage src={item.headimg} />
                        <div className='nickname'>{item.nickname} </div>
                        <div className='text'>{item.message}</div>
                        <div className='shareimg'>
                            {item.img1 == 'undefined' ? <div></div> : <Zmage src={item.img1} />}
                            {item.img2 == 'undefined' ? <div></div> : <Zmage src={item.img2} />}
                            {item.img3 == 'undefined' ? <div></div> : <Zmage src={item.img3} />}
                        </div>
                        <div className='sharetime'>{item.dtime}</div>
                    </div>)

                })
                }
                <div className='onbottom'>我也是有底线的ヽ(≧□≦)ノ</div>
            
        </div >)


    }
    getregister = (nickname) => {
        return (<div className='userdetail'>
            <p>{nickname}</p>
            <a onClick={() => { this.props.history.push({ pathname: '/change', query: { title: '修改信息' } }) }}>点此修改信息</a>
        </div>)
    }
    getlogin = () => {
        return (<Button onClick={() => { this.props.history.push({ pathname: '/login', query: { title: '登录/注册' } }) }}>登录/注册</Button>)
    }
    render() {
        const loginstate = this.props.flag
        // console.log(this.props.user==undefined)
        return (<div className='showmy'>
             <PullToRefresh
                damping={60}
                ref={el => this.ptr = el}
                style={{
                    height: `${(document.querySelector('body').offsetHeight - 95) + 'px'}`,
                    overflow: 'auto',
                }}
                indicator={this.state.down ? { deactivate: '下拉刷新' } : { deactivate: '上拉可以刷新' }}
                direction={this.state.down ? 'down' : 'up'}
                refreshing={this.props.refreshing}
                onRefresh={() => {
                    this.setState({ refreshing: true });
                    this.timer = setTimeout(() => {
                        this.setState({ refreshing: false });
                        if(this.props.user){this.getcomments(this.props.user.uid)}
                        
                    }, 1000);
                }}
            >
            {this.props.user != undefined ? <img className='gaosimohu' src={this.props.user.headimg_url} /> : <img className='gaosimohu' src={require('../static/images/null.jpg')} />}
            {/* <img className='gaosimohu' src={require('../static/images/null.jpg')}/> */}
            <div className='showup'>
                {this.props.user != undefined ? <img src={this.props.user.headimg_url} /> : <img src={require('../static/images/null.jpg')} />}
                {/* <img src={require('../static/images/null.jpg')} /> */}
                {loginstate == true ? this.getregister(this.props.user.nickname) : this.getlogin()}
            </div>
            <div className='showdown'>
                <h2>我的发表</h2>
                <div className='line'></div>
                {/* {loginstate==false?<div className='nonecom'>登录后即可查看个人分享</div>:(this.props.user?(this.state.list.length?(this.state.list.length&&this.getmycomments(0)):(this.getmycomments(0))):<div></div>)} */}
                {loginstate == false ? <div className='nonecom'>登录后即可查看个人分享</div> : (this.state.list.length ? this.getmycomments() :(this.state.noget==true?<div>暂时还没有发表过任何内容，快去发表吧</div>:this.getcom(this.props.user.uid)))}
            </div>
            </PullToRefresh>
        </div>)
    }
}
//使用connect组件连接redux和当前组件
const mapStatetoProps = (state) => {
    return { flag: state.login.flag, user: state.login.user }
}
const mapDispatchToProps = { loginin, loginout }
export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(User));