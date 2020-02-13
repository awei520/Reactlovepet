import React from 'react'
import { connect } from 'react-redux'
import { changeCityFn } from '../actions/action'
import { fetchget } from '../utils/myfetch'
import { ActivityIndicator } from 'antd-mobile'
import Rcarousel from '../components/Rcarousel'
import Inforlist from './homelist/Inforlist'
import Homemenu from './Homemenu'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hotlist: [],
            refreshing: false
        }
    }
    getData = async () => {
        let { message } = await fetchget("/api/gethomehot")
        this.timer = setTimeout(() => {
            this.setState(state => ({
                hotlist: [...state.hotlist, ...message],
                refreshing: false
            }))
        }, 1000);
    }
    async componentDidMount() {
        let { message } = await fetchget("/api/gethomehot")

        this.setState({
            hotlist: [...message]
        })
        // console.log(this.state.hotlist)
    }
    //在组件即将销毁的时候要释放一些组件
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render() {
        return (<React.Fragment>
            <Rcarousel></Rcarousel>
            <Homemenu></Homemenu>
            {
                this.state.hotlist.length
                    ? <Inforlist hotlist={this.state.hotlist} getData={this.getData} refreshing={this.refreshing}></Inforlist>
                    : <ActivityIndicator text="Loading..." />
            }

        </React.Fragment>)
    }
}
//将state状态映射到属性里面,之后可以通过props获取
const mapStatetoProps = (state) => {
    return { city: state.city }
}

//addFn 自动有了dispatch的功能 onClick={addFn} ; addFn  minusFn  minusFn会被映射到props里面
const mapDispatchToProps = { changeCityFn }

export default connect(mapStatetoProps, mapDispatchToProps)(Home)
