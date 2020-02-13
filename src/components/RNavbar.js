import React from 'react'
import { NavBar, Icon,SearchBar } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
function Navbar(props) {
  
   return(
       <NavBar
       mode="dark"   //深颜色
    ><SearchBar placeholder="点此搜索宠物资讯" maxLength={8} onSubmit={(value)=>props.history.push({pathname:`/search/${value}`,query: { title : '搜索结果' }})}/></NavBar>
   )  
    
}
//将state状态映射到属性里面,之后可以通过props获取
const mapStatetoProps=(state)=>{
    return { city:state.city}
}

//addFn 自动有了dispatch的功能 onClick={addFn} ; addFn  minusFn  minusFn会被映射到props里面
// const mapDispatchToProps={changeCityFn}

export default connect(mapStatetoProps)(withRouter(Navbar))
