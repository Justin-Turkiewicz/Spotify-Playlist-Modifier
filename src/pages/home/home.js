import * as React from 'react';
import Navbar from '../navbar/navbar.js';
import './home.scss';
const Home = () =>  {
    return (
        <React.Fragment>
        <div id="topBackground">
            <div class="container" id="homeContainer">
                <Navbar />
                <div class="row justify-content-center" id="secondRow">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="title">
                        <h1>ClassifyTheSpot</h1>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="gistOfThePurpose">
                        <p>ClassifyTheSpot allows you to rank your songs on your Spotify 
                            account with a self-defined scale and creates
                            seperate playlists for the songs in each tier of the scale.
                        </p>
                    </div>
                </div>
                <div class="row" id="loginRow">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="spotUsername">
                        <input type="text" id="emailUsername" name="emailOrUsername" placeholder="Enter Email or Username" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="spotUsername">
                        <input type="text" id="password" name="password" placeholder="Enter Password" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="spotUsername">
                        <button id="logInSpotify">Log In</button>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>

    );
}

export default Home;