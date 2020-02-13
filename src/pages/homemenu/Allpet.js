import React from 'react'
import { Grid } from 'antd-mobile';
import './Allpet.css'
import { withRouter } from 'react-router-dom'
import dog from '../../static/images/1.jpg'
import cat from '../../static/images/2.jpg'
import rabbit from '../../static/images/3.jpg'
import Mouse from '../../static/images/4.jpg'
import other from '../../static/images/5.jpg'
import { fetchget } from '../../utils/myfetch';
import Allpetli from '../homelist/Allpetli';
const menu = [{ name: '狗狗', pic: dog }, { name: '猫猫', pic: cat }, { name: '兔子', pic: rabbit }, { name: '鼠类', pic: Mouse }, { name: '其他', pic: other }]
const data = menu.map((val, i) => ({
    icon: val.pic,
    text: val.name,
}));
class Allpet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pettype: "狗狗",
            tid: 1,
            petlist: []
        }
    }
    async componentDidMount() {
        let { message } = await fetchget('/api/getpettype/' + this.state.tid)
        this.setState({
            petlist: [...message]
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className='allpet'>
                    <div className="sub-title"></div>
                    <Grid data={data} columnNum={5} onClick={


                        async (data) => {
                            if (data.text == '狗狗') {
                                this.setState((state) => ({
                                    pettype: "狗狗",
                                    tid: 1
                                }),async () => {
                                    let { message } = await fetchget('/api/getpettype/' + this.state.tid)
                                    this.setState({
                                        petlist: [...message]
                                    })
                                })

                            } else if (data.text == '猫猫') {
                                this.setState((state) => ({
                                    pettype: "猫猫",
                                    tid: 2
                                }), async () => {
                                    let { message } = await fetchget('/api/getpettype/' + this.state.tid)
                                    this.setState({
                                        petlist: [...message]
                                    })
                                })                                
                            } else if (data.text == '兔子') {
                                this.setState((state) => ({
                                    pettype: "兔子",
                                    tid: 3
                                }),async () => {
                                    let { message } = await fetchget('/api/getpettype/' + this.state.tid)
                                    this.setState({
                                        petlist: [...message]
                                    })
                                }) 
                            } else if (data.text == '鼠类') {
                                this.setState((state) => ({
                                    pettype: "鼠类",
                                    tid: 4
                                }),async () => {
                                    let { message } = await fetchget('/api/getpettype/' + this.state.tid)
                                    this.setState({
                                        petlist: [...message]
                                    })
                                })
                            } else if (data.text == '其他') {
                                this.setState((state) => ({
                                    pettype: "其他",
                                    tid: 5
                                }),async () => {
                                    let { message } = await fetchget('/api/getpettype/' + this.state.tid)
                                    this.setState({
                                        petlist: [...message]
                                    })
                                })
                            }
                        }
                    } />
                </div>
                <Allpetli petlist={this.state.petlist}></Allpetli>
            </React.Fragment>
        )
    }
}


export default withRouter(Allpet)