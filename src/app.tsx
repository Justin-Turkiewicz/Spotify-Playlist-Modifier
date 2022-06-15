import * as React from 'react';
import Main from './main';
import './app.css';
import { SpotifyInfo } from './constants/spotify_info';
import axios from 'axios';


class App extends React.Component {
  body = "";
  xhr = new XMLHttpRequest();
  componentDidMount = () => {
    this.pageLoaded();
  }
  pageLoaded(){
    // Query String exists
    if(window.location.search.length > 0){
      this.handleRedirect();
    }
  }
  handleRedirect(){
    let code = this.getCode();
    if(code != null){
    this.fetchAccessToken( code );
    }
    window.history.pushState("", "", SpotifyInfo.redirect_uri);
  }
  getCode(){
    let code = null;
    let queryString = window.location.search;
    // If Query String exists, get the code param 
    if(queryString.length > 0){
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get('code');
    }
    return code;
  }
  fetchAccessToken(code: String){
    this.body += 'grant_type=authorization_code';
    this.body += "&code="+code;
    this.body += "&redirect_uri="+encodeURI(SpotifyInfo.redirect_uri);
    this.body += "&client_id="+SpotifyInfo.client_id;
    this.body += "&client_secret="+SpotifyInfo.client_secret;
    this.callAuthorizationApi(this.body);
  }
  callAuthorizationApi(body: String){
    this.xhr.open("POST", SpotifyInfo.token, true);
    this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    this.xhr.setRequestHeader('Authorization', 'Basic '+ btoa(SpotifyInfo.client_id + ":"+ SpotifyInfo.client_secret));
    this.xhr.send(this.body);
    this.xhr.onload = () => {this.handleAuthorizationResponse(this.xhr);}
  }
  handleAuthorizationResponse(xhr: XMLHttpRequest){
    console.log(xhr);
    if(xhr.readyState == 4){
      if ( xhr.status == 200 ){
          var data = JSON.parse(xhr.responseText);
          console.log(data);
          var data = JSON.parse(xhr.responseText);
          if ( data.access_token != undefined ){
              let access_token = data.access_token;
              localStorage.setItem("access_token", access_token);
          }
          if ( data.refresh_token  != undefined ){
              let refresh_token = data.refresh_token;
              localStorage.setItem("refresh_token", refresh_token);
          }
          else {
            console.log(xhr.responseText);
            alert(xhr.responseText);
        }
      }
    }
  else{
    console.log(this.xhr.readyState);
    }

}
  render() {
    return (
      <React.Fragment>
            <div id="MainParent">
              <Main />   
            </div>
            </React.Fragment>
            
    );
  }
}

export default App;
