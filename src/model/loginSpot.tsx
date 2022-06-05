import axios from "axios";
import React, { Component } from "react";
interface loginProps{
  eOu: string;
  pass: string;
}
class LoginSpot extends Component<loginProps>{
    state: any;
    // private emailOrUsername: string = "";
    // private password: string = "";
    constructor(props: loginProps, emailOrUsername: string, password: string){
      super(props);
      this.state = {
        emailOrUsername: emailOrUsername,
        password: password
      };  
    }
    static getDerivedStateFromProps(props: loginProps, state: any){
      return {emailOrUsername: props.eOu,
              password: props.pass}
    }
    // setEmailOrUsername(newEmailOrUsername: string){
    //   this.emailOrUsername = newEmailOrUsername;
    // }
    // setPassword(newPassword: string){
    //   this.password = newPassword;
    // }
    // getEmailOrUsername(){
    //   return this.emailOrUsername;
    // }
    // getPassword(){
    //   return this.password;
    // }
    // getState(){
    //   return this.state.weather;
    // }
    componentDidMount = () => {
      axios.get('http://localhost:5000/testAPI').then(res => {
        this.setState({}, () => console.log(res));

      }
      )
    }
    render() {
      return (
        <div>
          <p>The user logged in.<br />
             Email or Username: {this.state.emailOrUsername} <br />
             Password: {this.state.password} </p>
        </div>
      );
    }
}

export default LoginSpot;