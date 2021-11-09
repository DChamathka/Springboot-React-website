import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import './assets/css/bootstrap.min.css'
import './assets/css/now-ui-kit.css'
import './assets/css/now-ui-kit.min.css'
import './assets/css/now-ui-kit.css.map'
import './assets/demo/demo.css'

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)
