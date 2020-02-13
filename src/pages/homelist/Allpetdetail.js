import React from 'react'
import { withRouter } from 'react-router-dom'
import { fetchget } from '../../utils/myfetch'
import './Allpetdetail.css'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import Hottype from '../../components/Hottype';

const tabs = [
    { title: <Badge >宠物详情</Badge> },
    { title: <Badge>注意事项</Badge> },

];
class Allpetdetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            petdetail: []
        }
    }
    async componentDidMount() {
        const petid = this.props.match.params.id
        let { message } = await fetchget('/api/getpetdetail/' + petid)
        this.setState((state) => ({
            petdetail: [...message]
        }), () => {
            
            this.setState({
                pname: this.state.petdetail[0].pname,
                intro: this.state.petdetail[0].intro,
                detailinfor: this.state.petdetail[0].detailinfor,
                attention: this.state.petdetail[0].attention
            })
        })

    }
    render() {
        return (<div className='petdetail'>
            <h1 className='pdname'>{this.state.pname}</h1>
            <div className='pdintro'>{this.state.intro}</div>
            <Tabs tabs={tabs}
            tabBarActiveTextColor='rgb(242, 71, 61)'
            tabBarUnderlineStyle={{border:'1px solid rgb(242, 71, 61)'}}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
                <div className='ptd' 
                dangerouslySetInnerHTML={{ __html: this.state.detailinfor }}
                style={{  backgroundColor: '#fff' }}>
                   
      </div>
                <div className='attention'
                dangerouslySetInnerHTML={{ __html: this.state.attention }}
                style={{   backgroundColor: '#fff' }}>
                    
      </div>

            </Tabs>       
            <Hottype></Hottype>    
        </div>)
    }
}


export default withRouter(Allpetdetail)