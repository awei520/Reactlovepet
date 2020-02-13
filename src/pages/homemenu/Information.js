import React from 'react'
import { fetchget } from '../../utils/myfetch'
import { ActivityIndicator } from 'antd-mobile'
import Inforli from '../homelist/Inforli'


class Information extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inlist: [],
            refreshing: false
        }
    }
    getData = async () => {
        let { message } = await fetchget("/api/getinformation")
        this.timer = setTimeout(() => {
            this.setState(state => ({
                inlist: [...state.inlist, ...message],
                refreshing: false
            }))
        }, 1000);
    }
    async componentDidMount() {
        let { message } = await fetchget("/api/getinformation")

        this.setState({
            inlist: [...message]
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
                this.state.inlist.length
                    ? <Inforli hotlist={this.state.inlist} getData={this.getData} refreshing={this.refreshing}></Inforli>
                    : <ActivityIndicator text="Loading..." />
            }
        </React.Fragment>)
    }
}
export default Information