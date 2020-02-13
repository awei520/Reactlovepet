import React from 'react'
import { withRouter } from 'react-router-dom'
import { ImagePicker, WingBlank, SegmentedControl, Button, Toast } from 'antd-mobile';
import { uploadImage, fetchpost } from '../../utils/myfetch'
import './Writeshare.css'
import { connect } from 'react-redux'
import { loginin, loginout } from '../../actions/action'
const data = [];
class Writeshare extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: data,
      multiple: false,
    }
  }
  postimg = async () => {
    // console.log(this.state.files[0].file.size)
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth()+1< 10?'0'+(today.getMonth()+1) :today.getMonth()+1) + '-' + (today.getDate()< 10?'0'+today.getDate() :today.getDate()) + ' ' + (today.getHours()< 10?'0'+today.getHours() :today.getHours()) + ':' + (today.getMinutes()< 10?'0'+today.getMinutes() :today.getMinutes());
    // console.log(date)
    let kb700 = []
    kb700 = this.state.files.filter((item) => {
      return item.file.size > (700 * 1024)
    })
    console.log(this.refs.messages.value, this.props.user.uid, date)
    if(this.state.files.length >3){
      Toast.info('最多上传3张图片！', 2);
    }else if(kb700.length != 0){
      Toast.info('上传图片大小不得超过700kb！', 2);
    }else if(this.state.files.length== 0){
      Toast.info('请选择至少一张图片', 2);
    }else if(this.refs.messages.value ==''){
      Toast.info('请输入你想分享的内容！', 2);
    }else {
      let { message } = await uploadImage('/api/profile', this.state.files)
      console.log(message[0],message[1],message[2],this.refs.messages.value, this.props.user, date)
      let obj={
        uid:this.props.user.uid,
        message:this.refs.messages.value,
        dtime:date,
        messageimg1:message[0],
        messageimg2:message[1],
        messageimg3:message[2],
        headimg:this.props.user.headimg_url.slice(25),
        nickname:this.props.user.nickname
      }
      let data = await fetchpost('/api/postshare',obj)
      if(data.status==0){
        Toast.info('上传成功！', 2);
        setTimeout(()=>{this.props.history.push({ pathname: '/share'})},2000)
        // this.props.history.push({ pathname: '/share'})
      }
    }
    // if (this.state.files.length < 4 && kb700.length == 0) {

    // } else {
    //   Toast.info('发表失败！请重新发表！', 2);
    // }

  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1,
    });
  }
  render() {
    const { files } = this.state;
    return (<React.Fragment>
      <div className='sharetext'>
        <textarea ref='messages' placeholder='输入你想分享的内容(最多200字)' maxLength="200"></textarea>
      </div>
      <WingBlank>
        <div className='maximg'>提示：每次最多可发表三张图片,且每张图片大小不超过700kb</div>
        <SegmentedControl
          values={['每次选择一张图片', '每次选择多张图片']}
          selectedIndex={this.state.multiple ? 1 : 0}
          onChange={this.onSegChange}
        />
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 3}
          multiple={this.state.multiple}
        />
      </WingBlank>
      <div className='fabiao'>
        <Button onClick={this.postimg}>发表</Button>
      </div>
    </React.Fragment>

    )
  }

}

//使用connect组件连接redux和当前组件
const mapStatetoProps = (state) => {
  return { flag: state.login.flag, user: state.login.user }
}
const mapDispatchToProps = { loginin, loginout }
export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(Writeshare));