import React from 'react'
import { ActivityIndicator } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import { fetchget } from '../../utils/myfetch'
 import './Diseasedetail.css'
import Recommend from '../../components/Recommend'
class Diseasedetail extends React.Component {
    constructor(props){
        super(props)
        this.state={
            dsslist:[]
        }
    }
    async componentDidMount(){
        const dssid=this.props.match.params.id
        let {message}=await fetchget('/api/getdiseasedetail/'+dssid)
        
        this.setState( ()=>({
            dsslist:[...message]
        }),()=>{
            this.setState({
                dsscontent:this.state.dsslist[0].dsscontent
            })
        })
    }
    render(){
        return(<div>
            <div dangerouslySetInnerHTML={{ __html: this.state.dsscontent }}></div>
            <Recommend></Recommend>
        </div>)
    }
}
export default withRouter(Diseasedetail)