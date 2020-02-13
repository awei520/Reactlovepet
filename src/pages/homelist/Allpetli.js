import React from 'react'
import { ActivityIndicator } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import './Allpetli.css'
class Allpetli extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    godetail=(id)=>{
        // console.log(id)
        this.props.history.push({pathname:'/allpetdetail/'+id})
    }
    getpetlist = () => {
        return (this.props.petlist.map((val, idx) => {
            return (<div className='petli' key={idx} onClick={()=>{this.godetail(val.pid)}}>
                <img src={val.pimg} />
                <div className='pname'>{val.pname}</div>
                <div className='intro'>{val.intro}</div>
            </div>)
        })

        )
    }
    render() {
        return (<div className='allpetli'>
            {this.props.petlist.length ? this.getpetlist() : <ActivityIndicator text="Loading..." />}
        </div>

        )
    }
}
export default withRouter(Allpetli)