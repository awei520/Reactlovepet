import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../pages/Home'
import Share from '../pages/Share'
import User from '../pages/User'
import Search from '../pages/Search'
import Hotdetail from '../pages/Hotdetail'
import Recommenddetail from '../pages/Recommenddetail'
import Information from '../pages/homemenu/Information'
import Inforlidetail from '../pages/homelist/Inforlidetail'
import Beauty from '../pages/homemenu/Beauty'
import Beautydetail from '../pages/homelist/Beautydetail'
import Allpet from '../pages/homemenu/Allpet'
import Allpetdetail from '../pages/homelist/Allpetdetail'
import Blankpet from '../components/Blankpet'
import Disease from '../pages/homemenu/Disease'
import Diseasedetail from '../pages/homelist/Diseasedetail'
import Writeshare from '../pages/share/Writeshare'
import Change from '../pages/user/Change'
import Login from '../pages/user/Login'
import Chooseone from '../pages/user/Chooseone'
import Choosetwo from '../pages/user/Choosetwo'
import Userblank from '../components/Userblank'
import Sharedetail from '../pages/share/Sharedetail'
import Sharedetail1 from '../pages/share/Sharedetail1'
function RouterMap(props) {
    return (
    <div id='container'>
       <Switch>
         <Route path='/' exact component={Home}></Route>
         <Route path='/share' component={Share}></Route>
         <Route path='/user' component={User}></Route>
         <Route path='/hotdetail/:id' component={Hotdetail}></Route>
         <Route path='/search/:name' component={Search}></Route>
         <Route path='/recommenddetail/:id' component={Recommenddetail}></Route>
         <Route path='/information' component={Information}></Route>
         <Route path='/inforlidetail/:id' component={Inforlidetail}></Route>
         <Route path='/beauty' component={Beauty}></Route>
         <Route path='/beautydetail/:id' component={Beautydetail}></Route>
         <Route path='/allpet' component={Allpet}></Route>
         <Route path='/allpetdetail/:id' component={Allpetdetail}></Route>
         <Route path='/blankpet/:id' component={Blankpet}></Route>
         <Route path='/disease/' component={Disease}></Route>
         <Route path='/diseasedetail/:id' component={Diseasedetail}></Route>
         <Route path='/writeshare' component={Writeshare}></Route>
         <Route path='/change' component={Change}></Route>
         <Route path='/login' component={Login}></Route>
         <Route path='/chooseone' component={Chooseone}></Route>
         <Route path='/choosetwo' component={Choosetwo}></Route>
         <Route path='/userblank' component={Userblank}></Route>
         <Route path='/sharedetail' component={Sharedetail}></Route>
         <Route path='/sharedetail1' component={Sharedetail1}></Route>
         {/* <Route path='/detail' component={Detail}></Route>       
         <Route path='/search' component={Search}></Route> */}
         {/* <Redirect path='/'></Redirect> */}
    </Switch> 
    </div>
    
    )
}
export default RouterMap