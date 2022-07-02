import React from "react";
import { Component, ReactNode } from "react";
import { SpotifyInfo } from "../../../constants/spotify_info";
import { addPlaylist, addTrack, callApi, fetchTracks, refreshAcessToken, removeAllItems } from "../../../packages/spotifyAPICalls/spotifyAPICalls";
import { SongDictionary } from "../../songDictionary/songDictionary";
import { ScaleComponent } from "../scaleComponent/scaleComponent";
import "./playlistComponent.scss";
interface loginProps{
    client_id: string;
    client_secret: string;
  }
interface loginState{
  playlistSelected: boolean
  playlistIDArray: string[]
}
export class PlayListComponent extends Component<loginProps, loginState>{
    xhr = new XMLHttpRequest();
    currentPlaylist = "";
    state: any;
    unique_uri: string;
    songDictionaryArray: SongDictionary[] = [];

    constructor(props: loginProps){
      super(props);
      this.state = {
        playlistSelected: false,
        playlistIDArray: []
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
    async refreshPlaylists(num: number){
      /// TODO: increase offset if user has more than 50 playlists
        callApi("GET", SpotifyInfo.playlists_url+"?limit=50", null, sessionStorage.getItem("client_id"), sessionStorage.getItem("access_token")).then(
          (data) =>
        {
          this.handlePlaylistsResponse(data, num);
        });
    }
    handlePlaylistsResponse(data: any, num: number){
        // console.log(data);
        // console.log(data.items);
        removeAllItems("playlists");
        data.items.forEach((item: any) => addPlaylist(item, num));
        (document.getElementById('playlists'+num)! as HTMLSelectElement).value=this.currentPlaylist;
        }
    
    render(){

        return(
          <div className="row" id="playlistRow">
            <div id="spotPlaylist">
              <div id="playlistAndRefreshButton1">
                <select id="playlists1" onChange={(event) => this.selectedPlaylistChange(event, 0)}></select>
                <input id="retrievePlaylistButton1" type="button" onClick={() => this.refreshPlaylists(1)} value="Retrieve Playlists"></input>
                {this.state.playlistSelected && <ScaleComponent displayTrackComponent="true" tracks={this.songDictionaryArray[0]} playlistID={this.state.playlistIDArray[0]} index={0}/> }
                {/*or. || doesn't work :( */} 
                {!this.state.playlistSelected && <ScaleComponent displayTrackComponent="false" tracks={new SongDictionary()} index={0}/>}
              </div>
              <div id="playlistAndRefreshButton2">
                <select id="playlists2" onChange={(event) => this.selectedPlaylistChange(event, 1)}></select>
                <input id="retrievePlaylistButton2" type="button" onClick={() => this.refreshPlaylists(2)} value="Retrieve Playlists"></input>
                {this.state.playlistSelected && <ScaleComponent displayTrackComponent="true" tracks={this.songDictionaryArray[1]} playlistID={this.state.playlistIDArray[1]} index={1}/> }
                {/* or. || doesn't work :(  */}
                {!this.state.playlistSelected && <ScaleComponent displayTrackComponent="false" tracks={new SongDictionary()} index={1}/>}
              </div> 
                
            </div>
          </div>
        );
        
    }
    selectedPlaylistChange = (event: any, index: number) => {
      // this.setState({
      //   unique_uri: event.target.value,
      //   playlistSelected: true}, () => {
        console.log(event.target.value);
        fetchTracks(event.target.value, 0, index, this.updatePlaylistStateAfterAddingTracks.bind(this));

        // });
    }
    updatePlaylistStateAfterAddingTracks(index: number, songDict?: SongDictionary, playlistID?: string, ){
      // console.log(songDict);
      // console.log(playlistID);
      this.songDictionaryArray[index] = songDict!;
      // console.log(this.songDictionaryArray);
      // console.log(this.songDictionaryArray[index]);
      let playlistIDArray = this.state.playlistIDArray;
      playlistIDArray[index] = playlistID;

      this.setState({playlistSelected: true,
        playlistIDArray: playlistIDArray},
       () => {
       });
    }
    // fetchTracks(playlistID: string){
    //   console.log(playlistID);
    //   let url = SpotifyInfo.tracks_url;
    //   url = url.replace("{{PlaylistId}}", playlistID);
    //   console.log(url);
    //   callApi("GET", url, null, sessionStorage.getItem("client_id"), sessionStorage.getItem("access_token")).then(
    //     (data) => {
    //     this.handleTracksResponse(data, playlistID);
    //   });
    //   // console.log(this.xhr);
    // }
    // handleTracksResponse(data: any, playlistID: string){
    //     console.log(data);
    //     console.log(data.items);
    //     // removeAllItems("tracks");
    //     this.songDict = {};
    //     data.items.forEach( (item: any, index: any) => addTrack(item, index, this.songDict));
    //     // console.log(this.songDict);
    //     this.setState({playlistSelected: true,
    //         playlistID: playlistID},
    //        () => {
    //        });
    // }
    }


