import axios from "axios";
import React, { Component } from "react";
interface loginProps{
  eOu: string;
  pass: string;
}
class LoginSpot extends Component<loginProps>{
    state: any;
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
    componentDidMount = () => {
      var client_id = '781e81484b8d48108ea949980400a2ee'; // Your client id
      var client_secret = 'ff82ef993b02452d8313f0e142e64b66';
      var redirect_uri = 'http://localhost:5000'; // Your redirect uri
      let url = 'https://accounts.spotify.com/authorize?'
      url += "?client_id="+ client_id;
      url += "&response_type=code";
      url += "&redirect_uri=" + encodeURI(redirect_uri);
      url += "&show_dialog=true";
      url += "&scope=user=user-read-private user-read-email";
      window.location.href = url;

      // axios.get('http://localhost:5000/testAPI',{
      //   data: "hi",
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     'Authorization': this.state.emailOrUsername,
      //     'Access-Control-Allow-Origin': 'http://localhost:3000'
      //     // 'Origin': 'http://localhost:3000',
      //   }
      // }).then(res => {
      //   console.log(res);

      // }
      // )
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