import axios from "axios";
import React, { Component } from "react";
import { SpotifyInfo } from "../constants/spotify_info";
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
      let url = SpotifyInfo.authorize;
      url += "?client_id="+ SpotifyInfo.client_id;
      url += "&response_type=code";
      url += "&redirect_uri=" + encodeURI(SpotifyInfo.redirect_uri);
      url += "&show_dialog=true";
      url += "&scope=user-read-private user-read-email";
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