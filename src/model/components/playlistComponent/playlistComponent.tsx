import React from "react";
import { Component, ReactNode } from "react";
import { SpotifyInfo } from "../../../constants/spotify_info";
import { addPlaylist, addTrack, callApi, fetchTracks, refreshAcessToken, removeAllItems } from "../../../packages/spotifyAPICalls/spotifyAPICalls";
import { Playlist } from "../../playlist/playlist";
import { SongDictionary } from "../../songDictionary/songDictionary";
import { ScaleComponent } from "../scaleComponent/scaleComponent";
import "./playlistComponent.scss";
interface loginProps{
    client_id: string;
    client_secret: string;
  }
interface loginState{
  playlistSelected: boolean
  currentlyDisplayedPlaylistArray: Playlist[]
  songDictionaryArray: SongDictionary[]
  addedTracks: String[][]
}
export class PlayListComponent extends Component<loginProps, loginState>{
    xhr = new XMLHttpRequest();
    currentPlaylist = "";
    state: any;
    unique_uri: string;
    playlistDictionaryArray: Playlist[] = [];

    constructor(props: loginProps){
      super(props);
      this.state = {
        playlistSelected: false,
        currentlyDisplayedPlaylistArray: [Playlist],
        songDictionaryArray: [SongDictionary],
        // First 3 are where tracks added are
        addedTracks: [[],[],[]]
      };  
      for(let i=0;i<3;i++){
        this.state.currentlyDisplayedPlaylistArray[i] = new Playlist();
        this.state.songDictionaryArray[i] = new SongDictionary();
      }
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
        data.items.forEach((item: any) => {
          this.playlistDictionaryArray = addPlaylist(item, num, this.playlistDictionaryArray);
          });
        (document.getElementById('playlists'+num)! as HTMLSelectElement).value=this.currentPlaylist;
        console.log(this.playlistDictionaryArray);
        }
    
    render(){
        return(
          <div className="row" id="playlistRow">
            <div id="spotPlaylist">
              <div id="playlistAndRefreshButton1">
                <select id="playlists1" onChange={(event) => this.selectedPlaylistChange(event, 0)}></select>
                <div className="playlistAndDeleteButtons">
                  <input id="retrievePlaylistButton1" type="button" onClick={() => this.refreshPlaylists(1)} value="Retrieve Playlists"></input>
                  <input id="deleteButton1" type="button" onClick={() => this.removeSelectedTracksFromPlaylist(0)} value="Delete Selected Tracks"></input>
                </div>
                {this.state.playlistSelected && <ScaleComponent displayTrackComponent="true" tracks={this.state.songDictionaryArray[0]} playlist={this.state.currentlyDisplayedPlaylistArray[0]} index={0} addTrackToPlaylist={this.addSongUriForPlaylist} tracksToAddToPlaylist={this.state.addedTracks[0]}/> }
                {/*or. || doesn't work :( */} 
                {!this.state.playlistSelected && <ScaleComponent displayTrackComponent="false" tracks={new SongDictionary()} playlist={new Playlist()} index={0} addTrackToPlaylist={this.addSongUriForPlaylist} tracksToAddToPlaylist={this.state.addedTracks[0]}/>}
              </div>
              <div id="playlistAndRefreshButton2">
                <select id="playlists2" onChange={(event) => this.selectedPlaylistChange(event, 1)}></select>
                <div className="playlistAndDeleteButtons">
                  <input id="retrievePlaylistButton2" type="button" onClick={() => this.refreshPlaylists(2)} value="Retrieve Playlists"></input>
                  <input id="deleteButton2" type="button" onClick={() => this.removeSelectedTracksFromPlaylist(1)} value="Delete Selected Tracks"></input>
                </div>
                {this.state.playlistSelected && <ScaleComponent displayTrackComponent="true" tracks={this.state.songDictionaryArray[1]} playlist={this.state.currentlyDisplayedPlaylistArray[1]} index={1} addTrackToPlaylist={this.addSongUriForPlaylist} tracksToAddToPlaylist={this.state.addedTracks[1]}/> }
                {/* or. || doesn't work :(  */}
                {!this.state.playlistSelected && <ScaleComponent displayTrackComponent="false" tracks={new SongDictionary()} playlist={new Playlist()} index={1} addTrackToPlaylist={this.addSongUriForPlaylist} tracksToAddToPlaylist={this.state.addedTracks[1]}/>}
              </div>
              <div id="playlistAndRefreshButton3">
                <select id="playlists3" onChange={(event) => this.selectedPlaylistChange(event, 2)}></select>
                <div className="playlistAndDeleteButtons">
                  <input id="retrievePlaylistButton3" type="button" onClick={() => this.refreshPlaylists(3)} value="Retrieve Playlists"></input>
                  <input id="deleteButton3" type="button" onClick={() => this.removeSelectedTracksFromPlaylist(2)} value="Delete Selected Tracks"></input>
                </div>
                
                {this.state.playlistSelected && <ScaleComponent displayTrackComponent="true" tracks={this.state.songDictionaryArray[2]} playlist={this.state.currentlyDisplayedPlaylistArray[2]} index={2} addTrackToPlaylist={this.addSongUriForPlaylist} tracksToAddToPlaylist={this.state.addedTracks[2]}/> }
                {/* or. || doesn't work :(  */}
                {!this.state.playlistSelected && <ScaleComponent displayTrackComponent="false" tracks={new SongDictionary()} playlist={new Playlist()} index={2} addTrackToPlaylist={this.addSongUriForPlaylist} tracksToAddToPlaylist={this.state.addedTracks[2]}/>}
              </div>  
            </div>
          </div>
        );
    }
    // Allow sibling component to update addedTracks for other sibiling components(sibiling being the scale components)
    addSongUriForPlaylist = (uri: String, songName: string, newIndex: number, originalIndex: number) => {
      let tempAddedTracks = this.state.addedTracks;
      let currentTracks = this.state.songDictionaryArray;
      // If no duplicate in new playlist
      if(!tempAddedTracks[newIndex].includes(uri)){
        // If playlist originally had the track on startup or previously when moved
        if(tempAddedTracks[originalIndex].includes(uri)){
          let indexOfElement = tempAddedTracks[originalIndex].indexOf(uri);
          tempAddedTracks[originalIndex].splice(indexOfElement, 1);
        }
        tempAddedTracks[newIndex].push(uri);
        let amountOfKeys = Object.keys(currentTracks[newIndex].dictionary).length;
        console.log(amountOfKeys); 
        currentTracks[newIndex].dictionary[amountOfKeys] = songName;
        currentTracks[newIndex].dictionaryURI[amountOfKeys] = uri;
        console.log(songName);
        console.log(currentTracks); 
      }
      // console.log(tempAddedTracks);
      this.setState({addedTracks: tempAddedTracks,
      songDictionaryArray: currentTracks}, () => {})
    }
    selectedPlaylistChange = (event: any, index: number) => {
      // this.setState({
      //   unique_uri: event.target.value,
      //   playlistSelected: true}, () => {
        // console.log(event.target.value);
        // STRIP Track number
        fetchTracks(event.target.value, 0, index, this.updatePlaylistStateAfterAddingTracks.bind(this));

        // });
    }
    updatePlaylistStateAfterAddingTracks = (index: number, songDict?: SongDictionary, playlistID?: string) => {
      // console.log(songDict);
      // console.log(playlistID);
      // this.state.songDictionaryArray[index] = songDict!;
      // console.log(this.songDictionaryArray);
      // console.log(this.songDictionaryArray[index]);
      let currentlyDisplayedPlaylistArray = this.state.currentlyDisplayedPlaylistArray;
      currentlyDisplayedPlaylistArray[index] = this.searchForPlaylistWithId(playlistID!);
      // console.log(this.playlistDictionaryArray);
      // console.log(currentlyDisplayedPlaylistArray);
      let songDictArray = this.state.songDictionaryArray;
      songDictArray[index] = songDict!;
      // console.log(songDictArray);
      let updatedAddedTracks = this.state.addedTracks;
      updatedAddedTracks[index] = [];
      // console.log(updatedAddedTracks);
      //Remove current tracks displayed in div
      // console.log(index);
      // let str = "playlistAndRefreshButton"+(index+1);
      // let playlistAndRefreshButtonDiv = document.getElementById(str);
      // console.log(playlistAndRefreshButtonDiv?.getElementsByTagName("div"));
      // let listOfTrackCardsDiv = playlistAndRefreshButtonDiv?.getElementsByTagName("div")[4];
      // console.log(listOfTrackCardsDiv);
      // let childrenListOfTrackCardsDiv = listOfTrackCardsDiv?.children;
      // console.log(childrenListOfTrackCardsDiv);
      // console.log(listOfTrackCardsDiv?.children);
            // let tracksArray = playlistAndRefreshButtonDiv?.getElementsByTagName("div")[3];
      // let newListOfTrackCardsDiv = document.createElement("div");
      // newListOfTrackCardsDiv.setAttribute("id", "listOfTrackCards");
      // tracksArray?.appendChild(newListOfTrackCardsDiv);
      // console.log(songDictArray);
      this.setState({playlistSelected: true,
        currentlyDisplayedPlaylistArray: currentlyDisplayedPlaylistArray,
        songDictionaryArray: songDictArray,
        addedTracks: updatedAddedTracks
        },
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
    searchForPlaylistWithId(id: string){
      for(let i=0;i<this.playlistDictionaryArray.length;i++){
        if(this.playlistDictionaryArray[i].id === id){
          return this.playlistDictionaryArray[i];
        }
      }
      return null;
    }
    removeSelectedTracksFromPlaylist(index: number){
      let str = "playlistAndRefreshButton"+(index+1);
      let playlistAndRefreshButtonDiv = document.getElementById(str);
      // console.log(playlistAndRefreshButtonDiv?.getElementsByTagName("div")[5]);
      let listOfTrackCardsDiv = playlistAndRefreshButtonDiv?.getElementsByTagName("div")[5];
      let children = listOfTrackCardsDiv?.children;
      let selectedTracks: string[] = [];
      // Find selected tracks and store them in selectedTracks array
      for(let i = 0;i<children!.length;i++){
        console.log(children![i].children[0].textContent);
        if(children![i].className === "selected"){
          let textContent = children![i].children[0].textContent
          if(textContent != undefined){
            selectedTracks.push(textContent)
          }
        }
      }
      console.log(selectedTracks);
      // Get songDictionary from state for corresponding playlist with index
      let newSongDictArray = this.state.songDictionaryArray;
      let songDictionary = newSongDictArray[index];
      let dict = songDictionary.dictionary;
      let dictUri = songDictionary.dictionaryURI;
      for(let j = 0; j < selectedTracks.length;j++){
        let keyValue = Object.keys(dict).find(key => dict[key] === selectedTracks[j]);
        if(keyValue != undefined){
          delete dict[keyValue];
          delete dictUri[keyValue];
        }
      }

      console.log(dict);
      let length = Object.keys(dict).length;
      let dictValues = [];
      let dictUriValues = [];
      // Get values(name of song and uri) from the two dictionaries and delete
      // those values in the dictionary
      for(let key in dict){
        dictValues.push(dict[key]);
        delete dict[key];
        dictUriValues.push(dictUri[key]);
        delete dictUri[key];
      }
      console.log(dictValues);
      console.log(dictUriValues);
      console.log(dict);
      console.log(dictUri);
      for(let k = 0;k<dictValues.length;k++){
        dict[k] = dictValues[k];
        dictUri[k] = dictUriValues[k];
      }
      console.log(dict);
      console.log(dictUri);
      // Change selected class to unselected
      let listOfTrackCardsDivNew = playlistAndRefreshButtonDiv?.getElementsByTagName("div")[5];
      let childrenNew = listOfTrackCardsDiv?.children;
      for(let h =0;h<childrenNew!.length;h++){
        if(childrenNew![h].className === "selected"){
          childrenNew![h].className = "unselected";
        }
      }
      songDictionary.dictionary = dict;
      songDictionary.dictionaryURI = dictUri;
      newSongDictArray[index] = songDictionary;
      this.setState({
        songDictionaryArray: newSongDictArray
      }, () => {})
    }
    }


