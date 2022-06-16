import * as React from 'react';
import LoginSpot from '../../model/loginSpot';
import { PlayListComponent } from '../../model/playlistComponent';
import Navbar from '../navbar/navbar';
import './home.scss';

class Home extends React.Component{
state: any
client_id: string
client_secret: string
// loginSpot: LoginSpot
constructor(props: any){
    super(props)
    this.client_id = "";
    this.client_secret ="";
    // this.loginSpot = new LoginSpot(props, "", "");
    this.state = {
        displayPlaylist: false
    };
    if(sessionStorage.getItem("client_id") != undefined && sessionStorage.getItem("client_secret") != undefined
    && sessionStorage.getItem("access_token") != undefined && sessionStorage.getItem("refresh_token") != undefined){
        console.log(sessionStorage.getItem("client_id"))
        this.state = {
            displayPlaylist: true
        };
    }

}
componentDidMount(){
    if(this.state.displayPlaylist){
        document.getElementById("loginRow")?.remove();
    }
}
addSpot = (client_id: string, client_secret: string) => {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.setState({displayPlaylist: true}, () => {
        console.log("State login: "+this.state.displayPlaylist);
        // console.log("LoginSpot client_id:" + this.client_id);
        // console.log("LoginSpot client_secret: "+this.client_secret);
    });
}

render()  {
    return (
        <React.Fragment>
        <div id="topBackground">
            <div className="container" id="homeContainer">
                <Navbar />
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
                    {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="spotUsername">
                        <button id="logInSpotify" onClick={() => loginSpotify(
                            (document.getElementById("client_idUsername") as HTMLInputElement).value,
                            (document.getElementById("client_secret") as HTMLInputElement).value)}>Log In</button>
                    </div> */}
                </div>
                {this.state.displayPlaylist && (<PlayListComponent client_id={this.client_id} client_secret={this.client_secret}/>)}
            </div>
            {/* { this.state.displayLoginSpot && (
                    <LoginSpot client_id={this.client_id}
                    client_secret={this.client_secret} />
                )} */}
        </div>
        </React.Fragment>

    );
}

loginSpotify = (client_id: string, client_secret: string): void => {
    console.log(client_id);
    console.log(client_secret);
}

}


export default Home;
