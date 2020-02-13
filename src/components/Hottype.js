import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { fetchget } from '../utils/myfetch'
import './Hottype.css'
class Hottype extends React.Component {
    constructor() {
        super()
        this.state = {
            hottypelist: []
        }
    }
    gethottype = () => {
        return (
            <div className='hottype'>
                <div className='hott'><p>热门宠物</p></div>
                {this.state.hottypelist.map((val, idx) => {
                    return (
                        <Link to={'/blankpet/' + val.pid} key={idx}>
                            <div className='htlist' >
                                <img src={val.imgurl}/>
                                <div className='hide'>{val.pname}</div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }
    async componentDidMount() {
        let { message } = await fetchget('/api/gethottype')
        this.setState({
            hottypelist: [...message]
        })
    }
    render() {
        return (<React.Fragment>
            {this.gethottype()}
        </React.Fragment>

        )
    }
}

export default withRouter(Hottype)