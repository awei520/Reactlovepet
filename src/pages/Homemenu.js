import React from 'react'
import { Grid } from 'antd-mobile';
import './Homemenu.css'
import {withRouter} from 'react-router-dom'
import information from '../static/images/information.jpg'
import allpet from '../static/images/allpet.jpg'
import beauty from '../static/images/beauty.jpg'
import disease from '../static/images/disease.jpg'
const menu=[{name:'宠物资讯',pic:information},{name:'宠物大全',pic:allpet},{name:'宠物美容',pic:beauty},{name:'宠物疾病',pic:disease}]
const data =menu.map((val, i) => ({
    icon: val.pic,
    text: val.name,
  }));
class Homemenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <React.Fragment>
                <div className="sub-title"></div>
                <Grid data={data} columnNum={2} onClick={                    
                    (data)=>{
                        if(data.text=='宠物资讯'){
                            this.props.history.push({pathname:'/information'})
                        }else if(data.text=='宠物大全'){
                            this.props.history.push({pathname:'/allpet'})
                        }else if(data.text=='宠物美容'){
                            this.props.history.push({pathname:'/beauty'})
                        }else if(data.text=='宠物疾病'){
                            this.props.history.push({pathname:'/disease'})
                        }                      
                    }
                    }/>
            </React.Fragment>
        )
    }
}


export default withRouter(Homemenu)