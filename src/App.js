import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Header from './components/header/Header';
import Detail from './components/collections/Detail';

function App() {
  return (
    <div className="App">
       <Router>
       <Header/>
         <Switch>
             <Route exact path="/">
               <Login/>
            </Route>
            <Route  path="/home">
               <Home/>
            </Route>
            <Route path="/detail/:id" >
              <Detail/>
            </Route>
        </Switch>
      </Router>
   
    </div>
  );
}

export default App;
