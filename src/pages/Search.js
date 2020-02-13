import React from 'react'
import {withRouter}  from 'react-router-dom'
import { fetchget } from '../utils/myfetch'
import './Search.css'
import Inforli from './homelist/Inforli'
class Search extends React.Component{
    constructor(props){
       super(props)
       this.state={
         searchlist:[],
         refreshing: false
       }
    }
    getData = async () => {
        let name=this.props.match.params.name
        let { message } = await fetchget('/api/getsearch/'+encodeURI(name))
        this.timer = setTimeout(() => {
            this.setState(state => ({
                searchlist: [...state.searchlist, ...message],
                refreshing: false
            }))
        }, 1000);
    }
    async componentDidMount(){
        let name=this.props.match.params.name
        let {message}=await fetchget('/api/getsearch/'+encodeURI(name))
        this.setState({
            searchlist:[...message]
        })
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render(){
    return(<div>
          {
                this.state.searchlist.length
                    ? <Inforli hotlist={this.state.searchlist} getData={this.getData} refreshing={this.refreshing}></Inforli>
                    : <div className='searcherro'>抱歉，未搜到相关信息</div>
            }
    </div>)
    }
}

export default withRouter(Search)