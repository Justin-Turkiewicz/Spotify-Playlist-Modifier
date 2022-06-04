import * as React from 'react';
import LoginSpot from '../../model/loginSpot';
import Navbar from '../navbar/navbar';
import './home.scss';

class Home extends React.Component{
state: any
constructor(props: any){
    super(props);
    this.state = {
        displayLoginSpot: false
    };
}

addSpot = () => {
    this.setState({displayLoginSpot: true}, () => {
        console.log(this.state.displayLoginSpot)
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
                        <input type="text" id="emailUsername" name="emailOrUsername" placeholder="Enter Email or Username" />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="spotUsername">
                        <input type="text" id="password" name="password" placeholder="Enter Password" />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="spotUsername">
                        <button id="logInSpotify" onClick={() => this.addSpot()}>Log In</button>
                    </div>
                    {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="spotUsername">
                        <button id="logInSpotify" onClick={() => loginSpotify(
                            (document.getElementById("emailUsername") as HTMLInputElement).value,
                            (document.getElementById("password") as HTMLInputElement).value)}>Log In</button>
                    </div> */}
                </div>
            </div>
            { this.state.displayLoginSpot && (
                    <LoginSpot />
                )}
        </div>
        </React.Fragment>

    );
}

loginSpotify = (email: string, password: string): void => {
    console.log(email);
    console.log(password);
}

}


export default Home;
