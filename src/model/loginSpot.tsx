import axios from "axios";
import React, { Component } from "react";
import { SpotifyInfo } from "../constants/spotify_info";
interface loginProps{
  client_id: string;
  client_secret: string;
}
class LoginSpot extends Component<loginProps>{
    state: any;
    constructor(props: loginProps, client_id: string, client_secret: string){
      super(props);
      this.state = {
        client_id: client_id,
        client_secret: client_secret
      };  
    }
    static getDerivedStateFromProps(props: loginProps, state: any){
      return {client_id: props.client_id,
              client_secret: props.client_secret}
    }
    componentDidMount = () => {
      localStorage.setItem("client_id", this.state.client_id);
      localStorage.setItem("client_secret", this.state.client_secret);
      let url = SpotifyInfo.authorize;
      url += "?client_id="+ this.state.client_id;
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
      //     'Authorization': this.state.client_id,
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
             Email or Username: {this.state.client_id} <br />
             client_secret: {this.state.client_secret} </p>
        </div>
      );
    }
}

export default LoginSpot;