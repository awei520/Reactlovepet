import React from 'react'
import add from '../static/images/add.jpg'
import { withRouter } from 'react-router-dom'
import './Share.css'
import { connect } from 'react-redux'
import { loginin, loginout } from '../actions/action'
import { Toast, PullToRefresh, ActivityIndicator } from 'antd-mobile';
import { fetchget } from '../utils/myfetch'
import Zmage from 'react-zmage'
class Share extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            down: true,
            sharelist: [],
            num: [],
        }
    }
    writeshare = () => {
        const flag = this.props.flag
        console.log(flag)
        if (flag == true) {
            this.props.history.push({ pathname: '/writeshare', query: { title: '分享' } })
        } else {
            Toast.info('请登录！', 2);
        }

    }
    getData = async () => {
        let { message } = await fetchget('/api/getshare')
        var maplist1 = message
        var numlist1 = maplist1.map(async (item, idx) => {
            let data = await fetchget('/api/getcom/' + item.cid)
            //    console.log(data.message.length)
            return data.message.length
        })
        this.setState({
            num: []
        })
        setTimeout(() => {
            numlist1.map((item, idx) => {
                item.then((resolved) => {
                    this.setState({
                        num: [...this.state.num, resolved]
                    })
                }
                )
            })
        }, 1000);

        this.setState({
            sharelist: [...message],

        })
    }
    getsharelist = () => {
        return (<div className='sharelist'>
            {this.state.sharelist.map((item, idx) => {
                return (<div className='headimg' key={idx}>
                    {/* {this.state.numthis.getlength(item.cid)} */}
                    <Zmage src={item.headimg} />
                    <div className='nickname'>{item.nickname} </div>
                    <div className='text' onClick={() => { this.props.history.push({ pathname: '/sharedetail', query: { title: '详情', cid: item.cid } }) }}>{item.message}</div>
                    <div className='shareimg'>
                        {item.img1 == 'undefined' ? <div></div> : <Zmage src={item.img1} />}
                        {item.img2 == 'undefined' ? <div></div> : <Zmage src={item.img2} />}
                        {item.img3 == 'undefined' ? <div></div> : <Zmage src={item.img3} />}
                    </div>
                    <div className='headimgbt' >
                        <div className='sharetime'>{item.dtime}</div>
                        <i className="fa fa-commenting-o" aria-hidden="true" onClick={() => { this.props.history.push({ pathname: '/sharedetail', query: { title: '详情', cid: item.cid } }) }}>({this.getlength(idx)})</i>
                    </div>

                    {/* <i className="fa fa-heart" aria-hidden="true"></i>
            <i className="fa fa-heart active" aria-hidden="true"></i>             */}
                </div>)

            })
            }
            <div className='onbottom'>我也是有底线的ヽ(≧□≦)ノ</div>
        </div >)
    }
    getlength = (idx) => {
        return this.state.num[idx]
    }
    async componentDidMount() {
        let { message } = await fetchget('/api/getshare')
        var maplist = message
        var numlist = maplist.map(async (item, idx) => {
            let data = await fetchget('/api/getcom/' + item.cid)
            //    console.log(data.message.length)
            return data.message.length
        })
        this.setState({
            num: []
        })
        setTimeout(() => {
            numlist.map((item, idx) => {
                item.then((resolved) => {
                    console.log(resolved)
                    this.setState({
                        num: [...this.state.num, resolved]
                    })
                })
            })
        }, 1000);

        this.setState({
            sharelist: [...message],
            // num:[...num1]
        })
        // console.log(this.state.sharelsit,this.state.num)
    }
    render() {
        return (<React.Fragment>
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
                        this.getData()
                    }, 1000);
                }}
            >
                <div className='petad'>
                    <img src={require('../static/images/shareimg.jpg')}></img>
                </div>

                {this.state.sharelist.length ? this.getsharelist() : <ActivityIndicator text="Loading..." />}
            </PullToRefresh>
            <img src={add} className='addimg' onClick={this.writeshare}></img>
        </React.Fragment>)
    }
}
//使用connect组件连接redux和当前组件
const mapStatetoProps = (state) => {
    return { flag: state.login.flag, user: state.login.user }
}
const mapDispatchToProps = { loginin, loginout }
export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(Share));