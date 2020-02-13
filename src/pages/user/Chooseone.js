import React from 'react'
import { withRouter } from 'react-router-dom'
import {fetchget} from '../../utils/myfetch'
import {ActivityIndicator}  from 'antd-mobile'
import './chooseone.css'
class Chooseone extends React.Component {
    constructor() {
        super()
        this.state = {
           headimg:[]
        }
    }
    async componentDidMount() {
        let {message}=await fetchget('/api/getheadimg')
        this.setState({
            headimg:[...message]
        })
    }
    gethead=()=>{
        return (
            this.state.headimg.map((item)=>{
            return (
                <div key={item.img_id} className='choosedetail' onClick={()=>{this.props.history.push({ pathname: '/login', query: { headimg: item.headimg_url,title:'登录/注册' } })}}>
                    <img src={item.headimg_url}/>
                </div>
            )
        }))
    }
    render() {
        return (<React.Fragment>
            <div className='choosehead'>
         目前有20个头像可供选择
          </div>
          {this.state.headimg.length?this.gethead():<ActivityIndicator text="Loading..." />}
        </React.Fragment>
        )
    }
}
export default withRouter(Chooseone)