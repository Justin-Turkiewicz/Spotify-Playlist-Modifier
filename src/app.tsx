import * as React from 'react';
import Main from './main';
import './app.css';
import { SpotifyInfo } from './constants/spotify_info';

class App extends React.Component {
  render() {
    return (
            <div id="MainParent">
              <Main />   
            </div>   
    );
  }
}

export default App;
