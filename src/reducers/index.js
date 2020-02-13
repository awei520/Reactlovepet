import {combineReducers} from 'redux'

// redux提供的用于多个reducer合并的方法
import login from './login'
// 将counter和location合并导出
export default combineReducers({login})