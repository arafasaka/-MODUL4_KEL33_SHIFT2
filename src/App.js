//import logo from './logo.svg';
import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Counter from './learn-useState/Counter';
import Effect from './learn-useEffect/Index';
import Context from './learn-useContext/Index';
import ReduceAndRef from './learn-useReducerRef/Index';

function App() {
  return (
    <Router>
    <div className="App-header">
      <nav className="NavBar">
        <ul className="ul">
          <li className="li">
            <Link to="/" >Use State</Link>
          </li>
          <li className='li'>
            <Link to="/effect">Use Effect</Link>
          </li>
          <li className='li'>
            <Link to="/context">Use Context</Link>
          </li>
          <li className='li'>
            <Link to="/ReduceAndRef">Reduce And Ref</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Counter}/>
        <Route path="/effect" exact component={Effect}/>
        <Route path="/context" exact component={Context}/>
        <Route path="/ReduceAndRef" exact component={ReduceAndRef}/>
      </Switch>
      </div>
    </Router>

  );
}

export default App;
