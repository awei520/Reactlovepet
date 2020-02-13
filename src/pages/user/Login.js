import React from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs, Toast,Badge, Button } from 'antd-mobile';
import './Login.css'
import '../../static/css/font-awesome.css'
import { fetchpost} from '../../utils/myfetch'
import { connect } from 'react-redux'
import {loginin} from '../../actions/action'
const tabs = [
    { title: <Badge >登录</Badge> },
    { title: <Badge>注册</Badge> },

];
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            inpage: 0,
            url: 'http://formywei.club:8999/headimg/null.jpg'
        }
    }
    componentDidMount() {
        if (this.props.location.query) {
            if (this.props.location.query.headimg) {
                this.setState((state) => ({
                    inpage: 1,
                    url: this.props.location.query.headimg
                }), () => {

                })
            } else {
                this.setState({
                    inpage: 0,

                })
            }

        }
    }
    gettaps = (inpage) => {
        return (<Tabs tabs={tabs}
            tabBarActiveTextColor='rgb(242, 71, 61)'
            tabBarUnderlineStyle={{ border: '1px solid rgb(242, 71, 61)' }}
            tabBarBackgroundColor='rgba(255, 255, 255, 0)'
            initialPage={inpage}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >

            <div className='ptd'
                style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>

                <div className='cinput1'>
                    <span><i className="fa fa-user-circle-o" aria-hidden="true"></i></span>
                    <input ref='username' type='text' placeholder='请输入账号'></input>
                </div>
                <div className='cinput2'>
                    <span><i className="fa fa-lock" aria-hidden="true"></i></span>
                    <input ref='password' type='password' placeholder='请输入密码'></input>
                </div>
                <Button type='warning' onClick={this.login}>登录</Button>

            </div>
            <div className='attention'
                style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                <div className='headimg'
                    style={{
                        width: '60px',
                        height: '60px',
                        margin: 'auto',
                        marginTop: '10px',
                        backgroundImage: `url(${this.state.url})`,
                        backgroundSize: 'cover',
                        lineHeight: '60px',
                        color: 'grey',
                        borderRadius: '50%',
                    }}
                    onClick={() => { this.props.history.push({ pathname: '/chooseone', query: { title: '选择头像' } }) }}
                >
                    更换头像
                  </div>
                <div className='ainput1'>
                    <span><i className="fa fa-user-circle-o" aria-hidden="true"></i></span>
                    <input ref='username1' type='text' placeholder='请输入账号'></input>
                </div>
                <div className='ainput2'>
                    <span><i className="fa fa-lock" aria-hidden="true"></i></span>
                    <input ref='password1' type='password' placeholder='请输入密码'></input>
                </div>
                <div className='ainput3'>
                    <span><i className="fa fa-lock" aria-hidden="true"></i></span>
                    <input ref='again1' type='password' placeholder='请重复密码'></input>
                </div>
                <div className='ainput4'>
                    <span><i className="fa fa-id-card" aria-hidden="true"></i></span>
                    <input ref='nickname1' type='text' placeholder='请输入昵称'></input>
                </div>
                <Button type='warning' onClick={this.register}>注册</Button>
            </div>

        </Tabs>
        )
    }
    componentWillUnmount() {
        // this.setState({
        //     inpage:0,
        //     url:'http://192.168.23.59:8999/headimg/null.jpg'
        // })
    }
    login = async () => {
        console.log(this.refs.username.value)
        let obj = {
            username: this.refs.username.value,
            password: this.refs.password.value
        }
        if (obj.username == '') {
            Toast.info('请输入账号', 2);
            return false;
        }

        if (obj.password == '') {
            Toast.info('请输入密码', 2);
            return false;
        }
        let { message } = await fetchpost('/api/login', obj)
        console.log(message)
        if (message == '登录失败,请检查用户名或密码是否输入正确！') {
            Toast.info('登录失败,请检查用户名或密码是否输入正确！', 2);
        } else {
           this.props.history.push({ pathname: '/user' })
           let {loginin} = this.props
           loginin(message)
        }

    }
    register = async () => {
        var url = this.state.url.slice(25)
        console.log(url)
        let obj = {
            username: this.refs.username1.value,
            password: this.refs.password1.value,
            url: url,
            nickname: this.refs.nickname1.value
        }
        if (!checkName(obj.username)) {
            Toast.info('账号为3-16位字母和数字的组合！', 2);
            return false;
        }

        if (!checkPsd(obj.password)) {
            Toast.info('密码为6-18位数字字母或下划线组成的！', 2);
            return false;
        }
        if (this.refs.again1.value !== obj.password) {
            Toast.info('两次密码不一致！', 2);
            return false;
        }
        if (this.refs.nickname1.value == '' || this.refs.nickname1.value.length > 6) {
            Toast.info('用户名不为空且小于7位！', 2);
            return false;
        }

        //验证账号
        function checkName(input) {
            var pattern = /^[A-Za-z][0-9A-Za-z]{3,19}$/;
            return pattern.test(input);
        }

        //验证密码
        function checkPsd(input) {
            var pattern = /^[a-z0-9_-]{6,18}$/;
            // var pattern = /^[0-9]{4,16}$/
            return pattern.test(input);
        }
        console.log(obj)
        let data= await fetchpost('/api/register',obj)
        // console.log(data)
        if(data.status==0){
            Toast.info('注册成功请登录！', 3);
            this.refs.username1.value=''
            this.refs.password1.value=''
            this.setState({
                url: 'http://formywei.club:8999/headimg/null.jpg'
            })
            this.refs.nickname1.value=''
            this.refs.again1.value=''
        }else if(data.status==1){
            Toast.info('注册失败！已存在相同用户！', 2);
        }
    }
    render() {
        return (<div className='user-login'>
            <div className='cover'></div>
            <img src={require('../../static/images/loginback.jpg')} />>
            {this.state.inpage == 1 && this.gettaps(1)}
            {this.state.inpage == 0 && this.gettaps(0)}
        </div>)
    }
}


//使用connect组件连接redux和当前组件
const mapStatetoProps = (state) => {
    console.log(state.login.flag)
    // return { flag:city: state.city }
}
const mapDispatchToProps = { loginin}
// export default withRouter(Login)
export default connect(mapStatetoProps,mapDispatchToProps)(withRouter(Login));
