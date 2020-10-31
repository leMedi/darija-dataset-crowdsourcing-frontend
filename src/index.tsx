import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import './services/firebase';
import './index.less';

import Dashboard from './layouts/Dashboard/Dashboard';
import Login from './containers/Login';
import Loader from './components/Loader';
import { $UserState } from './models/User';
import { useStore } from 'effector-react';
import { useState } from 'react';


const App = () => {
  const [isLoading, setIsLoding] = useState(true)
  const user = useStore($UserState)

  useEffect(() => {
    const timeOut = setTimeout(() => setIsLoding(false), 500)
    return () => clearTimeout(timeOut)
  }, [])

  if(isLoading) 
    return (
      <div id="app-wrapper">
        <Loader />
      </div>
    )
  
  if(!user)
    return (
      <div id="app-wrapper">
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </Router>
      </div>
    )

  return (
    <div id="app-wrapper">
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Redirect to="/dashboard/dictionary" />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
