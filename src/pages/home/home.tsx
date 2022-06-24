import * as React from 'react';
import { SpotifyInfo } from '../../constants/spotify_info';
import { PlayListComponent } from '../../model/components/playlistComponent/playlistComponent';
import { ScaleComponent } from '../../model/components/scaleComponent/scaleComponent';
import { callAuthorizationApi, refreshAcessToken } from '../../packages/spotifyAPICalls/spotifyAPICalls';
import './home.scss';

export class Home extends React.Component{
state: any
client_id: string
client_secret: string
body = "";
xhr = new XMLHttpRequest();
// loginSpot: LoginSpot
constructor(props: any){
    super(props)
    this.client_id = "";
    this.client_secret ="";
    // this.loginSpot = new LoginSpot(props, "", "");
 
        // console.log(sessionStorage.getItem("client_id"))
        if(sessionStorage.getItem("client_id") != undefined && sessionStorage.getItem("client_secret") != undefined){
                this.pageLoaded();
                this.state = {
                    displayPlaylist: true
                };
        }
        else{
        this.state = {
            displayPlaylist: false
        };
        }
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
  this.client_id = sessionStorage.getItem("client_id")!;
  this.client_secret = sessionStorage.getItem("client_secret")!;
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
  this.body += "&client_id="+this.client_id;
  this.body += "&client_secret="+this.client_secret;
  callAuthorizationApi(this.client_id, this.body, false);
}




// refreshAcessToken() {
//   let refresh_token = localStorage.getItem("refresh_token");
//   let body = "grant_type=refresh_token";
//   body += "&refresh_token=" + refresh_token;
//   body += "&client_id=" + this.client_id;
//   this.callAuthorizationApi(body);
// }
componentDidMount(){
    this.checkToRemoveLoginRow();
}
checkToRemoveLoginRow = () =>{
    if(this.state.displayPlaylist){
        document.getElementById("loginRow")?.remove();
    }
}
addSpot = (client_id: string, client_secret: string) => {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.setState({}, () => {
        if(sessionStorage.getItem("client_id") == undefined || sessionStorage.getItem("client_secret") == undefined ||
            sessionStorage.getItem("access_token") == undefined || sessionStorage.getItem("refresh_token") == undefined){
        sessionStorage.setItem("client_id", client_id);
        sessionStorage.setItem("client_secret", client_secret);
        let url = SpotifyInfo.authorize;
        url += "?client_id="+ client_id;
        url += "&response_type=code";
        url += "&redirect_uri=" + encodeURI(SpotifyInfo.redirect_uri);
        url += "&show_dialog=true";
        url += "&scope=user-read-private user-read-email";
        window.location.href = url;
        }
        if(sessionStorage.getItem("client_id") != undefined && sessionStorage.getItem("client_secret") != undefined
        && sessionStorage.getItem("access_token") != undefined && sessionStorage.getItem("refresh_token") != undefined){
            this.state = {
                    displayPlaylist: true
                };
        }
        console.log("SetState: "+this.state.displayPlaylist);


        // console.log("State login: "+this.state.displayPlaylist);
        // console.log("LoginSpot client_id:" + this.client_id);
        // console.log("LoginSpot client_secret: "+this.client_secret);
    });
}

render()  {
    return (
        <React.Fragment>
        <div id="topBackground">
            <div className="container" id="homeContainer">
                {/* <Navbar /> */}
                <div className="row justify-content-center" id="secondRow">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="title">
                        <h1>ClassifyTheSpot</h1>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="gistOfThePurpose">
                        <p>ClassifyTheSpot allows you to rank your songs on your Spotify 
                            account with a self-defined scale and creates
                            seperate playlists for the songs in each tier of the scale.
                        </p>
                    </div>
                </div>
                {!this.state.displayPlaylist && this.loginInfo()
                }

                {this.state.displayPlaylist && (<PlayListComponent client_id={this.client_id} client_secret={this.client_secret}/>) }

                <div id="playlistScaleSpacer">
                </div>
                
                {this.state.displayPlaylist && (<ScaleComponent />)}
            </div>
        </div>
        </React.Fragment>

    );
}
loginInfo(): any {
    return (
        <React.Fragment>
        <div className="row" id="loginRow">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="spotUsername">
                        <input type="text" id="clientId" name="clientId" placeholder="Enter Client ID" />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="spotUsername">
                        <input type="text" id="clientSecret" name="clientSecret" placeholder="Enter Client Secret" />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="spotUsername">
                        <button id="logInSpotify" onClick={() => this.addSpot(
                            (document.getElementById("clientId") as HTMLInputElement).value,
                            (document.getElementById("clientSecret") as HTMLInputElement).value)
                        }>Log In</button>
        </div>
        </div>
        </React.Fragment>
    );
}
}



