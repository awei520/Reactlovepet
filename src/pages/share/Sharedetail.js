import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginin} from '../../actions/action'
import { Toast, ActivityIndicator,Button } from 'antd-mobile';
import { fetchget,fetchpost } from '../../utils/myfetch'
import Zmage from 'react-zmage'
import './sharedetail.css'
import Comlist from '../../components/Comlist'
class Sharedetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            detail:[],
            comlist:[]
        }
    }
    async componentDidMount(){
       let {message}=await fetchget('/api/getoneshare/'+this.props.location.query.cid)
       let data=await fetchget('/api/getcom/'+this.props.location.query.cid)
       console.log(data.message)
       this.setState({
           detail:[...message],
           comlist:[...data.message]
       })
    }
    getdetail=()=> {
        return this.state.detail.map((item,idx)=>{
            return (<div className='headimg' key={idx}>
            <Zmage src={item.headimg} />
            <div className='nickname'>{item.nickname} </div>
            <div className='text' >{item.message}</div>
            <div className='shareimg'>
                {item.img1 == 'undefined' ? <div></div> : <Zmage src={item.img1} />}
                {item.img2 == 'undefined' ? <div></div> : <Zmage src={item.img2} />}
                {item.img3 == 'undefined' ? <div></div> : <Zmage src={item.img3} />}
            </div>
            <div className='sharetime'>{item.dtime}</div>
        </div>)
        })
    }
    postcom=async(cid,nickname,headimg)=>{
        var today = new Date(),
      date = today.getFullYear() + '-' + ((today.getMonth()+1)< 10?'0'+(today.getMonth()+1) :today.getMonth()+1) + '-' + (today.getDate()< 10?'0'+today.getDate() :today.getDate()) + ' ' + (today.getHours()< 10?'0'+today.getHours() :today.getHours()) + ':' + (today.getMinutes()< 10?'0'+today.getMinutes() :today.getMinutes())+':' + (today.getSeconds()< 10?'0'+today.getSeconds() :today.getSeconds());
        let obj={
            cid:cid,
            nickname:nickname,
            headimg:headimg.slice(25),
            message:this.refs.sharecom.value,
            dtime:date
        }
        if(this.refs.sharecom.value==''){
            Toast.info('请输入评论！', 2)
            return
        }
        let {message} = await fetchpost ('/api/postcom',obj)
       if(message=='上传成功！'){
        this.refs.sharecom.value=''
       }
       this.props.history.push({pathname: '/sharedetail1', query: { title: '详情',cid:this.props.location.query.cid}})
    }
    render(){
        const loginornot =this.props.flag
    //    const nickname=this.props.user.nickname
    //    const headimg
    return(<div className='sharedetail'>
        {this.state.detail.length?this.getdetail() : <ActivityIndicator text="Loading..." />}
        {this.state.comlist.length?<Comlist comlist={this.state.comlist}></Comlist>:<div className='nonepeople'>暂时还没有人评论快来占个沙发吧！</div>}
        <div className='writetext'>
            <input ref='sharecom' type='text' maxLength="80"  placeholder='添加评论(最多80字)'></input>
            <Button onClick={()=>{loginornot==true?this.postcom(this.props.location.query.cid,this.props.user.nickname,this.props.user.headimg_url): Toast.info('请登录！', 2)}}>发送</Button>
        </div>
      
    </div>)
    }
}
//使用connect组件连接redux和当前组件
const mapStatetoProps = (state) => {
    return { flag: state.login.flag, user: state.login.user }
}
const mapDispatchToProps = {loginin}
export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(Sharedetail));