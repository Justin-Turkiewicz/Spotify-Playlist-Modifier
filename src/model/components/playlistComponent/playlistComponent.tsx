import React from "react";
import { Component, ReactNode } from "react";
import { SpotifyInfo } from "../../../constants/spotify_info";
import { addPlaylist, addTrack, callApi, refreshAcessToken, removeAllItems } from "../../../packages/spotifyAPICalls/spotifyAPICalls";
import { ScaleComponent } from "../scaleComponent/scaleComponent";
import "./playlistComponent.scss";
interface loginProps{
    client_id: string;
    client_secret: string;
  }
export class PlayListComponent extends Component<loginProps>{
    xhr = new XMLHttpRequest();
    currentPlaylist = "";
    state: any;
    unique_uri: string;
    songDict: {[id: string]: string} = {};

    constructor(props: loginProps){
      super(props);
      this.state = {
        client_id: props.client_id,
        client_secret: props.client_secret,
        playlistSelected: false
      };  
      this.unique_uri = "";
    }
    componentDidMount = () => {
        // if(sessionStorage.getItem("client_id") == undefined || sessionStorage.getItem("client_secret") == undefined ||
        //     sessionStorage.getItem("access_token") == undefined || sessionStorage.getItem("refresh_token") == undefined){
        // sessionStorage.setItem("client_id", this.state.client_id);
        // sessionStorage.setItem("client_secret", this.state.client_secret);
        // let url = SpotifyInfo.authorize;
        // url += "?client_id="+ this.state.client_id;
        // url += "&response_type=code";
        // url += "&redirect_uri=" + encodeURI(SpotifyInfo.redirect_uri);
        // url += "&show_dialog=true";
        // url += "&scope=user-read-private user-read-email";
        // window.location.href = url;
        // }
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
    async refreshPlaylists(){
      /// TODO: increase offset if user has more than 50 playlists
        callApi("GET", SpotifyInfo.playlists_url+"?limit=50", null, sessionStorage.getItem("client_id"), sessionStorage.getItem("access_token")).then(
          (data) =>
        {
          this.handlePlaylistsResponse(data);
        });
    }
    handlePlaylistsResponse(data: any){
        console.log(data);
        console.log(data.items);
        removeAllItems("playlists");
        data.items.forEach((item: any) => addPlaylist(item));
        (document.getElementById('playlists')! as HTMLSelectElement).value=this.currentPlaylist;
        }
    
    render(){
      let cardToBeDisplayedComponent = <ScaleComponent displayTrackComponent="true"/>;
        return(
          <div className="row" id="playlistRow">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex flex-column justify-content-center" id="spotPlaylist">
                <select id="playlists" className="form-control" onChange={(event) => this.selectedPlaylistChange(event)}></select>
                <input className="btn btn-primary btn-sm mt-3" id="retrievePlaylistButton" type="button" onClick={() => this.refreshPlaylists()} value="Retrieve Playlists"></input>
                {this.state.playlistSelected && <ScaleComponent displayTrackComponent="true" tracks={this.songDict}/> }
                {/*or. || doesn't work :( */} 
                {!this.state.playlistSelected && <ScaleComponent displayTrackComponent="false"/>}
            </div>
          </div>
        );
        
    }
    selectedPlaylistChange = (event: any) => {
      // this.setState({
      //   unique_uri: event.target.value,
      //   playlistSelected: true}, () => {
        console.log(event.target.value);
        this.fetchTracks(event.target.value);

        // });
    }
    fetchTracks(playlistID: string){
      console.log(playlistID);
      let url = SpotifyInfo.tracks_url;
      url = url.replace("{{PlaylistId}}", playlistID);
      console.log(url);
      callApi("GET", url, null, sessionStorage.getItem("client_id"), sessionStorage.getItem("access_token")).then(
        (data) => {
        this.handleTracksResponse(data);
      });
      // console.log(this.xhr);
    }
    handleTracksResponse(data: any){
        console.log(data);
        console.log(data.items);
        // removeAllItems("tracks");
        this.songDict = {};
        data.items.forEach( (item: any, index: any) => addTrack(item, index, this.songDict));
        // console.log(this.songDict);
        this.setState({playlistSelected: true},
           () => {
           });
    }
    }


