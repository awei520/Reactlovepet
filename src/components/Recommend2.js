import React from 'react'
import './Recommend.css'
import { ActivityIndicator } from 'antd-mobile'
import {Link} from 'react-router-dom'
import { fetchget } from '../utils/myfetch'
class Recommend2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recomlist:[]
        }
    }
    async componentDidMount() {
        let { message } = await fetchget('/api/getrecommend')
        this.setState({
            recomlist: [...message]
        })
    }
    getrecomlist = () => {
        return (<div className='recommend'>
            <div className='recom'><p>编辑推荐</p></div>
            {this.state.recomlist.map((val,idx) => {
                if(idx>2){
                    return (
                    <Link to={'/hotdetail/'+val.id} key={idx}>
                    <div className='reclist' >
                        <span className='toplist1' onClick={async () => {let{message}=await fetchget('/api/updatehit/'+val.id)}}>{idx+1}</span>
                        <span className='title'>{val.title}</span>
                    </div>
                    </Link>                    
                )
                }else{
                    return (
                        <Link to={'/hotdetail/'+val.id} key={idx}>
                        <div className='reclist' onClick={async () => {let{message}=await fetchget('/api/updatehit/'+val.id)}}>
                            <span className='toplist'>{idx+1}</span>
                            <span className='title'>{val.title}</span>
                        </div>
                        </Link>                    
                    )
                }
                
            })}
        </div>

        )
    }

    render() {
        return (<React.Fragment>
                 {this.state.recomlist.length?this.getrecomlist():<ActivityIndicator text="Loading..." />}
            </React.Fragment>)
    }
}


export default Recommend2