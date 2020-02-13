import React from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs, Badge, Button, Toast } from 'antd-mobile';
import './Login.css'
import '../../static/css/font-awesome.css'
import { connect } from 'react-redux'
import { loginin } from '../../actions/action'
import { fetchpost } from '../../utils/myfetch'
const tabs = [
    { title: <Badge >修改信息</Badge> },
];
class Change extends React.Component {
    constructor() {
        super()
        this.state = {
            url: 'http://formywei.club:8999/headimg/null.jpg'
        }
    }
    componentDidMount() {
        if (this.props.location.query) {
            if (this.props.location.query.headimg) {
                this.setState((state) => ({
                    url: this.props.location.query.headimg
                }), () => { })
            }
        }
    }

    componentWillUnmount() {
        // this.setState({
        //     inpage:0,
        //     url:'http://192.168.23.59:8999/headimg/null.jpg'
        // })
    }
    changeinfor = async () => {
        var url = this.state.url.slice(25)
        let obj = {
            uid: this.props.user.uid,
            username: this.props.user.username,
            userpassword: this.refs.psd.value,
            nickname: this.refs.nickname.value,
            headimg_url: url
        }
        // console.log(this.refs.oldpsd.value,this.props.user)
        if (this.refs.oldpsd.value != this.props.user.userpassword) {
            Toast.info('旧密码输入错误！', 2);
            return false;
        }
        if (!checkPsd(obj.userpassword)) {
            Toast.info('密码为6-18位数字字母或下划线组成的！', 2);
            return false;
        }



        if (this.refs.nickname.value == '' || this.refs.nickname.value.length > 6) {
            Toast.info('用户名错误！', 2);
            return false;
        }

        //验证密码
        function checkPsd(input) {
            var pattern = /^[a-z0-9_-]{6,18}$/;
            // var pattern = /^[0-9]{4,16}$/
            return pattern.test(input);
        }




        let data = await fetchpost('/api/changeuser', obj)


        if (data.status == 0) {
            let obj1 = {
                uid: this.props.user.uid,
                username: this.props.user.username,
                userpassword: this.refs.psd.value,
                nickname: this.refs.nickname.value,
                headimg_url: this.state.url
            }
            const loginin = this.props.loginin
            loginin(obj1)
            this.props.history.push({ pathname: '/user' })
        }

    }
    render() {
        return (<div className='user-login'>
            <div className='cover'></div>
            <img src={require('../../static/images/loginback.jpg')} />>
            <Tabs tabs={tabs}
                tabBarActiveTextColor='rgb(242, 71, 61)'
                tabBarUnderlineStyle={{ border: '1px solid rgb(242, 71, 61)' }}
                tabBarBackgroundColor='rgba(255, 255, 255, 0)'
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
                <div className='attention'
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                    <div className='headimg'
                        style={{
                            width: '60px',
                            height: '60px',
                            margin: 'auto',
                            marginTop: '10px',
                            backgroundImage: `url(${this.props.location.query?(this.props.location.query.headimg ? this.state.url : (this.props.user && this.props.user.headimg_url)):this.state.url})`,
                            backgroundSize: 'cover',
                            lineHeight: '60px',
                            color: 'grey',
                            borderRadius: '50%',
                        }}
                        onClick={() => { this.props.history.push({ pathname: '/choosetwo', query: { title: '选择头像' } }) }}
                    >
                        更换头像
                  </div>
                    <div className='ainput2'>
                        <span><i className="fa fa-lock" aria-hidden="true"></i></span>
                        <input ref='oldpsd' type='password' placeholder='请输入旧密码'></input>
                    </div>
                    <div className='ainput3'>
                        <span><i className="fa fa-lock" aria-hidden="true"></i></span>
                        <input ref='psd' type='password' placeholder='请输入新密码'></input>
                    </div>
                    <div className='ainput4'>
                        <span><i className="fa fa-id-card" aria-hidden="true"></i></span>
                        <input ref='nickname' type='text' placeholder='请输入昵称'></input>
                    </div>
                    <Button type='warning' onClick={this.changeinfor}>确认</Button>
                </div>
            </Tabs>
        </div>)
    }
}

//使用connect组件连接redux和当前组件
const mapStatetoProps = (state) => {
    console.log(state.login)
    return { flag: state.login.flag, user: state.login.user }
}
const mapDispatchToProps = { loginin }
// export default withRouter(Login)
export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(Change));