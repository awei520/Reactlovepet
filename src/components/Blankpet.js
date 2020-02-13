import React from 'react'
import {withRouter} from 'react-router-dom'

class Blankpet extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    componentDidMount(){
        const zid=this.props.match.params.id
        this.props.history.push({pathname:'/allpetdetail/'+zid})
    }
    render(){
          return (<div>loading....</div>)
    }
}


export default withRouter(Blankpet)