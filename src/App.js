import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom'
import Navbar from './components/RNavbar'
import Nav from './components/Nav2'
import Nav1 from './components/Nav1'
import Navshare from './components/Navshare'
import Navuser from './components/Navuser'
import Navdetail from './components/Navdetail'
import Nava from './components/Nava'
import Navb from './components/Navb'
import Navc from './components/Navc'
import Navd from './components/Navd'
import Backtoshare from './components/Backtoshare'
import Tabbar from './components/RTabbar'
import Nonetab from './components/Nonetab'
import RouterMap from './router/RouterMap'

class App extends React.Component {
  constructor(props){
    super(props)
   this.state={
     navType:'home',
     tabType:'default'
   }
  }
  componentDidMount() {
    //监听路由的变化
    this.props.history.listen(route => {  
      if (route.pathname=="/share") {
        this.setState({
          navType: "share",
          tabType:'default'
        })
      }else if (route.pathname == '/') {
        this.setState({
          navType: "home",
          tabType:'default'
        })
      }else if(route.pathname.startsWith('/hotdetail')){
        this.setState({
        navType: "detail",
        tabType:'default'
      })}else if(route.pathname.startsWith('/user')){
        this.setState({
          navType: "user",
          tabType:'default'
        })
      }else if(route.pathname.startsWith('/information')){
        this.setState({
          navType: "nava",
          tabType:'default'
        })
      }else if(route.pathname.startsWith('/search')){
        this.setState({
          navType: "nav",
          tabType:'default'
        })
      }else if(route.pathname=='/allpet'){
        this.setState({
          navType: "navb",
          tabType:'default'
        })
      }else if(route.pathname=='/beauty'){
        this.setState({
          navType: "navc",
          tabType:'default'
        })
      }else if(route.pathname=='/disease'){
        this.setState({
          navType: "navd",
          tabType:'default'
        })
      }else if(route.pathname=='/login'){
        this.setState({
          navType: "nav",
          tabType:'default'
        })
      }else if(route.pathname=='/change'){
        this.setState({
          navType: "nav",
          tabType:'default'
        })
      }else if(route.pathname=='/chooseone'){
        this.setState({
          navType: "nav",
          tabType:'default'
        })
      }else if(route.pathname=='/choosetwo'){
        this.setState({
          navType: "nav",
          tabType:'default'
        })
      }else if(route.pathname.startsWith('/inforlidetail')){
        this.setState({
          navType: "detail",
          tabType:'default'
        })
      }else if(route.pathname.startsWith('/allpetdetail')){
        this.setState({
          navType: "detail",
          tabType:'default'
        })
      }else if(route.pathname.startsWith('/beautydetail')){
        this.setState({
          navType: "detail",
          tabType:'default'
        })
      }else if(route.pathname.startsWith('/diseasedetail')){
        this.setState({
          navType: "detail",
          tabType:'default'
        })
      }else if(route.pathname.startsWith('/sharedetail')){
        this.setState({
          navType: "back",
          tabType:'detail'
        })
      }else if(route.pathname.startsWith('/sharedetail1')){
        this.setState({
          navType: "back",
          tabType:'detail'
        })
      }else if(route.pathname.startsWith('/writeshare')){
        this.setState({
          navType: "nav",
          tabType:'default'
        })
      }
    })
  }
  gettabar=()=>{
    if(this.state.tabType=='default'){
      return <Tabbar></Tabbar>
    }else{
      return <Nonetab></Nonetab>
    }
  }
  getNavbar = () => {
       if(this.state.navType=='home'){
         return <Navbar></Navbar>
       }else if(this.state.navType=='share'){
         return <Navshare></Navshare>
       }else if(this.state.navType=='back'){
        return <Backtoshare></Backtoshare>
      }else if(this.state.navType=='user'){
        return <Navuser></Navuser>
      }else if(this.state.navType=='detail'){
        return <Navdetail></Navdetail>
      }else if(this.state.navType=='nava'){
        return <Nava></Nava>
      }else if(this.state.navType=='navb'){
        return <Navb></Navb>
      }else if(this.state.navType=='navc'){
        return <Navc></Navc>
      }else if(this.state.navType=='navd'){
        return <Navd></Navd>
      }else if(this.state.navType=='nav'){
        return <Nav></Nav>
      }else if(this.state.navType=='nav1'){
        return <Nav1></Nav1>
      }
      
  }
  render() {
    return (
      <React.Fragment>
        {this.getNavbar()}
        <RouterMap></RouterMap>
        
        {this.gettabar()}
      </React.Fragment>
    );

  }

}

export default withRouter(App);
