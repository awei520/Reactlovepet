import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
// import './static/css/common.css'

//创建store
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import { Provider } from 'react-redux'
let store = createStore(reducer,applyMiddleware(thunk))
store.subscribe(() => console.log(store.getState()))
ReactDOM.render(<HashRouter><Provider store={store}><App /></Provider></HashRouter>, document.getElementById('root'));

serviceWorker.unregister();