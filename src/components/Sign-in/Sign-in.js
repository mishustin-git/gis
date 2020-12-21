  import React, { Component } from 'react'
  import {
  Link
} from "react-router-dom";
  import {Header} from '../../components/Header/Header.js'
  
  const API = 'http://phpcode/action.php?login=';
  
  export class Sign_in extends Component {
    constructor(props) {
      super(props);
      this.state = {value: '',prevValue:'',login:'',mail:'',password:''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
    handleChange(event) {
      let type = event.target.attributes[0].value;
      if (type == "login")
      {
        this.setState({login: event.target.value});  
      }
      if (type == "password")
      {
        this.setState({password: event.target.value});  
      }
      // if (type == "mail")
      // {
      //   this.setState({mail: event.target.value});  
      // }
      //console.log(event.target.attributes[0].value);
      //this.setState({value: event.target.login});
    }
    handleSubmit(event) {
      //alert('Отправленное имя: ' + this.state.value);
      //let example = JSON.stringify(this.state);
      //console.log(example);
      // const LOGIN_QUERY = this.state.login;
      // const PASSWORD_QUERY = "&password="+this.state.password;
      // const MAIL_QUERY = "&mail="+this.state.mail;
      // //console.log()
      // fetch(API +LOGIN_QUERY+ PASSWORD_QUERY+MAIL_QUERY).then(response => response.json()).then(data => this.setState({ prevValue: data }));
      // event.preventDefault();
      //TO DO ввод пользователя
      sessionStorage.setItem('key', 'true');
      let data = sessionStorage.getItem('key');
      console.log(data);
      // Header.shouldComponentUpdate();
    }
    handleClick(event){
      // sessionStorage.removeItem('key');
      // sessionStorage.setItem('key', 'false');
      // let data = sessionStorage.getItem('key');
      //console.log(data);
      sessionStorage.clear();
      // sessionStorage.setItem('key', 'false');
      // let data = sessionStorage.getItem('key');
      // console.log(data);
      //Header.shouldComponentUpdate();
    }
    render () {
      return (
        <div className='Sign'>
          <form onSubmit={this.handleSubmit}>
            <label>
              login:
              <input type="login" value={this.state.login} onChange={this.handleChange} />
            </label>
            <label>
              password:
              <input type="password" value={this.state.password} onChange={this.handleChange} />
            </label>
            {/*<label>
              mail:
              <input type="mail" value={this.state.mail} onChange={this.handleChange} />
            </label>*/}
            <input type="submit" value="Отправить" />
            <p>Dont have an account?<Link to="/sign-up">Sign Up</Link></p>
           </form>
           <form onSubmit={this.handleClick}>
           <input type="submit" value="Отправить" />
           </form>
        </div>
      )
    }
  }
  