import * as React from 'react';
import './navbar.scss';
const NavBar = () =>  {
    return (
        <React.Fragment>
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
        </React.Fragment>

    );
}

export default NavBar;