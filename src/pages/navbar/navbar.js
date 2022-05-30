import * as React from 'react';
import './navbar.scss';
const NavBar = () =>  {
    return (
        <React.Fragment>
            <div id="topBackground">
                <div class="container">
                    <div class="row justify-content-center" id="rowLinks">
                        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" id="HomeNav">
                            <p>Home</p>
                        </div>
                        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" id="LogInNav">
                            <p>Log In</p>
                        </div>
                        <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1" id="AboutNav">
                            <p>About</p>
                        </div>
                    </div>
            </div>
            <div class="container" id="titleAndGist">
                <div class="row gy-5" id="secondRow">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" id="title">
                        <h1>ClassifyTheSpot</h1>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" id="gistOfThePurpose">
                        <p>ClassifyTheSpot allows you to rank your songs on your Spotify account with a self-defined scale and creates
                            seperate playlists for the songs in each tier of the scale.
                        </p>
                    </div>
                </div>
            </div>  

            </div>
        </React.Fragment>

    );
}

export default NavBar;