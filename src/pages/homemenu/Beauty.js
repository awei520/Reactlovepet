import React from 'react'
import { fetchget } from '../../utils/myfetch'
import { ActivityIndicator } from 'antd-mobile'
import Beautyli from '../homelist/Beautyli'


class Information extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bealist: [],
            refreshing: false
        }
    }
    getData = async () => {
        let { message } = await fetchget("/api/getbeauty")
        this.timer = setTimeout(() => {
            this.setState(state => ({
                bealist: [...state.bealist, ...message],
                refreshing: false
            }))
        }, 1000);
    }
    async componentDidMount() {
        let { message } = await fetchget("/api/getbeauty")

        this.setState({
            bealist: [...message]
        })
        // console.log(this.state.hotlist)
    }
    //在组件即将销毁的时候要释放一些组件
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render() {
        return (<React.Fragment>   
            {
                this.state.bealist.length
                    ? <Beautyli hotlist={this.state.bealist} getData={this.getData} refreshing={this.refreshing}></Beautyli>
                    : <ActivityIndicator text="Loading..." />
            }
        </React.Fragment>)
    }
}
export default Information