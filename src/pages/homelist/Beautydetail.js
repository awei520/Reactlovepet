import React from 'react'
import { ActivityIndicator } from 'antd-mobile'
import '../Hotdetail.css'
import { fetchget } from '../../utils/myfetch'
import Hottype from '../../components/Hottype'
class Inforlidetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contents: [],

        }
    }
    async componentDidMount() {
        let { message } = await fetchget("/api/getdetail/" + this.props.match.params.id)
        // console.log(message)
        this.setState({
            contents: [...message]
        })
        this.setState({
            str: this.state.contents[0].content,
            title: this.state.contents[0].title,
            director: this.state.contents[0].director,
            time: this.state.contents[0].itime,
            hit:this.state.contents[0].hit
        })
        // console.log(this.state.contents[0].title)
    }
    render() {
        return (<div className='detail'>
            <h2>{this.state.title}</h2>
            <div style={{
                fontFamily: 'icomoon',
                fontSize: '16px',
                width: '100%',
                marginTop: '10px',
                color: 'grey'
            }} className="icon-user"
            > 编辑:{this.state.director}
                <span style={{
                    float: 'right',
                    paddingRight: '8px'
                }}>
                    时间:{this.state.time}
                </span>
            </div>
            <div className='hitnum'>点击量:{this.state.hit}</div>
            {this.state.str?<div className='hotcontent' dangerouslySetInnerHTML={{ __html: this.state.str }}>
            </div>:<ActivityIndicator text="Loading..." />}
           <Hottype></Hottype>
        </div>)
    }
}

export default Inforlidetail