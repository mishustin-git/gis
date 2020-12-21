import React, { Component } from 'react'
import {Home} from '../../components/Home/Home.js'
import {Inputviewmap} from "../../components/ViewMap/ViewMap.js"
import {InputmakeLayer} from "../../components/MakeLayer/MakeLayer.js"
import {Inputmakemap} from "../../components/MakeMap/MakeMap.js"
import {Sign_in} from '../../components/Sign-in/Sign-in.js'
import {Sign_up} from '../../components/Sign-up/Sign-up.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export class Header extends Component{
  
    constructor(props) {
      super(props);
      this.state = {insystem:sessionStorage.getItem('key')}
    }

    componentDidMount(){
    if (this.state.insystem!=sessionStorage.getItem('key'))
      {
        this.setState({insystem:sessionStorage.getItem('key')});
        return true;
      }
      else
        return false;
    }
    shouldComponentUpdate(){
    if (this.state.insystem!=sessionStorage.getItem('key'))
    {
      this.setState({insystem:sessionStorage.getItem('key')})
      return true;
    }
    else
      return false;
  }
	 render () {
    let example;
    if (this.state.insystem)
      example = <Link to="/sign-in">Sign-Out</Link>;
    else
      example = <Link to="/sign-in">Sign-In</Link>;
      return (
        <Router>
      <div>
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/viewmap">ViewMap</Link>
          </li>
          <li>
            <Link to="/makelayers">Make Layers</Link>
          </li>
          <li>
            <Link to="/makemap">Make Map</Link>
          </li>
          <li>
            {example}
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/sign-in">
            <Sign_in/>
          </Route>
          <Route path="/sign-up">
            <Sign_up/>
          </Route>
          <Route path="/makelayers">
            <InputmakeLayer/>
          </Route>
          <Route path="/viewmap">
            <Inputviewmap/>
          </Route>
          <Route path="/makemap">
            <Inputmakemap/>
          </Route>
        </Switch>
      </div>
    </Router>
      )
    }
}

export default Header; 