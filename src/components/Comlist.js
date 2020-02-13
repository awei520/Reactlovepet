import React from 'react'
import { withRouter } from 'react-router-dom'
// import { loginin} from '../../actions/action'
import { ActivityIndicator, Button } from 'antd-mobile';
// import { fetchget,fetchpost } from '../../utils/myfetch'
import Zmage from 'react-zmage'
import './comlist.css'
class Comlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comlist: []
        }
    }
    async componentDidMount() {
        console.log(this.props.comlist)
        this.setState({
            comlist: [...this.props.comlist]
        })
    }
    getsharedetail = () => {
        return this.state.comlist.map((item, idx) => {
            return (<div className='sharedetail1' key={idx}>
                <Zmage src={item.headimg} />
                <div className='nickname1'>{item.nickname} </div>
                <div className='text1' >{item.message}</div>
                <div className='sharetime1'>{item.dtime}</div>
            </div>
            )
        })
    }

    render() {
        return (<React.Fragment>
            <div className='pinglun'>评论</div>
            {this.state.comlist.length && this.getsharedetail()}
        </React.Fragment>)
    }
}
// //使用connect组件连接redux和当前组件
// const mapStatetoProps = (state) => {
//     return { flag: state.login.flag, user: state.login.user }
// }
// const mapDispatchToProps = {loginin}
export default withRouter(Comlist);