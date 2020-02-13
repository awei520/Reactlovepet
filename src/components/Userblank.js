import React from 'react'
import {withRouter} from 'react-router-dom'

class Userblank extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    componentDidMount(){       
        this.props.history.push({pathname:'/user'})
    }
    render(){
          return (<div>loading....</div>)
    }
}


export default withRouter(Userblank)