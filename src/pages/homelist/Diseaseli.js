import React from 'react'
import { List, PullToRefresh,ActivityIndicator} from 'antd-mobile'
import {withRouter,Link} from 'react-router-dom'
import './Inforlist.css'
const Item = List.Item;
const Brief = Item.Brief;
class Diseaseli extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            down: false,//是否是上拉加载
        }
    }    
    getlist = () => {
        return (
            <PullToRefresh
                damping={100}
                ref={el => this.ptr = el}
                style={{
                    height: '650px',
                    overflow: 'auto',
                }}
                indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                direction={this.state.down ? 'down' : 'up'}
                refreshing={this.props.refreshing}
                onRefresh={() => {
                    // this.setState({ refreshing: true });
                    this.timer = setTimeout(() => {
                        // this.setState({ refreshing: false });
                        this.props.getData()
                    }, 1000);
                }}
            >
                <List className="my-list">
                    {this.props.dsslist.map((val,idx) => {                       
                        return (
                            <Link to={'/diseasedetail/'+val.iddss} key={idx}>
                            <Item 
                                arrow="horizontal"
                                
                                multipleLine
                                onClick={() => {}}
                            >
                                {val.title} <Brief>{val.intro}</Brief>
                            </Item>
                            </Link>
                            
                        )
                    })}
                </List>
            </PullToRefresh>
        )
    }
    



    render() {
        return ( <React.Fragment>
            {this.props.dsslist.length?this.getlist():<ActivityIndicator text="Loading..." />}
            </React.Fragment>
            
        )


    }


}


export default withRouter(Diseaseli)