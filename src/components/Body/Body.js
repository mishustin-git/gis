import React, { Component } from 'react'
import {Home} from '../../components/Home/Home.js'
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
      this.state.body = "",
    }
    // shouldComponentUpdate(){
    //   this.setState({insystem:sessionStorage.getItem('key')});
    // }
    componentDidMount(){
    if (this.state.insystem!=sessionStorage.getItem('key'))
{      this.setState({insystem:sessionStorage.getItem('key')});
return true;}
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
            {example}
          </li>
          <li>
             еще одна ссылка
             {console.log("Работать над историей")}
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
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
        </Switch>
      </div>
    </Router>
      )
    }
}

export default Header; 