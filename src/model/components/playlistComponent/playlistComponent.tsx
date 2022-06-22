import React from "react";
import { Component, ReactNode } from "react";
import { SpotifyInfo } from "../../../constants/spotify_info";
import { addPlaylist, callApi, removeAllItems } from "../../../packages/spotifyAPICalls/spotifyAPICalls";
import "./playlistComponent.scss";
interface loginProps{
    client_id: string;
    client_secret: string;
  }
export class PlayListComponent extends Component<loginProps>{
    xhr = new XMLHttpRequest();
    currentPlaylist = "";
    state: any;
    constructor(props: loginProps){
      super(props);
      this.state = {
        client_id: props.client_id,
        client_secret: props.client_secret
      };  
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
    refreshPlaylists(){
        this.xhr = callApi("GET", SpotifyInfo.playlists_url, null, this.handlePlaylistsResponse(), sessionStorage.getItem("access_token"))
    }
    handlePlaylistsResponse(){
        if(this.xhr.readyState == 4 && this.xhr.status == 200){
            var data = JSON.parse(this.xhr.responseText);
            console.log(data);
            removeAllItems("playlists");
            data.items.forEach((item: any) => addPlaylist(item));
            (document.getElementById('playlists')! as HTMLSelectElement).value=this.currentPlaylist;
        }
    }
    render(){
        return(
            <div className="row" id="playlistRow">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex flex-column justify-content-center" id="spotPlaylist">
                <select id="playlists" className="form-control"></select>
                <input className="btn btn-primary btn-sm mt-3" id="retrievePlaylistButton" type="button" onClick={() => this.refreshPlaylists()} value="Retrieve Playlists"></input>
                </div>
        </div>
        );
        
    }
    fetchPlaylist(): void {
        throw new Error("Method not implemented.");
    }
}

