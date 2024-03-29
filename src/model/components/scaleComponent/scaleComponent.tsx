import React from "react";
import { Component } from "react";
import { SpotifyInfo } from "../../../constants/spotify_info";
import { callApi, fetchTracks, handleClick } from "../../../packages/spotifyAPICalls/spotifyAPICalls";
import { Playlist } from "../../playlist/playlist";
import { SongDictionary } from "../../songDictionary/songDictionary";
import { TracksComponent } from "../tracksComponent/tracksComponent";
import './scaleComponent.scss';
interface ScaleProps{
    displayTrackComponent: string
    tracks: SongDictionary
    playlist: Playlist
    index: number
    addTrackToPlaylist: Function
    tracksToAddToPlaylist: String[]
}
interface ScaleStates{
    trackRangeCounter: number
    songDict: SongDictionary
    playlistID?: string
    prevTracks: SongDictionary
    firstCall: boolean
}
export class ScaleComponent extends Component<ScaleProps, ScaleStates>{
    ifClickedLast: boolean
    updateCannotClickNextAgain: boolean
    tracks: SongDictionary
    constructor(props: ScaleProps){
        super(props);
        this.ifClickedLast = false;
        this.updateCannotClickNextAgain = false;
        this.tracks = new SongDictionary();
        this.state = {
            trackRangeCounter: 0,
            songDict: new SongDictionary(),
            prevTracks: new SongDictionary(),
            firstCall: true,
        }

    } 
    moveLeft(){
        let leftPos = this.props.index;
        if(leftPos === 0){
            leftPos = 3;
        }
        let str = "playlistAndRefreshButton"+(this.props.index+1)
        // console.log(str);
        let playlistAndRefreshButtonDiv = document.getElementById(str);
        let listOfTrackCardsDiv = playlistAndRefreshButtonDiv?.getElementsByTagName("div")[5];
        // console.log(listOfTrackCardsDiv);
        let children = listOfTrackCardsDiv!.children;
        let childNodes = listOfTrackCardsDiv!.childNodes;
        let listOfSelectedElements = [];
        let listOfSelectedElementsSongName = [];
        for(let i = 0; i < children.length; i++){
            if(children[i].className === "selected"){
                let newChild : HTMLButtonElement  = children.item(i) as HTMLButtonElement;
                console.log(newChild);
                listOfSelectedElements.push(newChild);
                listOfSelectedElementsSongName.push(newChild.innerText);
            }

        }
        // console.log(leftPos);
        // console.log(listOfSelectedElements);
        let leftStr = "playlistAndRefreshButton"+(leftPos);
        let leftPlaylistAndRefreshButtonDiv = document.getElementById(leftStr);
        let leftListOfTrackCardsDiv = leftPlaylistAndRefreshButtonDiv?.getElementsByTagName("div")[5];
        console.log(leftListOfTrackCardsDiv);
        let amountOfTracksOnLeftDiv = leftListOfTrackCardsDiv?.children.length;
        for(let j = 0; j < listOfSelectedElements.length;j++){
            let indexWhereUriIs = listOfSelectedElements[j].id.indexOf("track", 27) + 6;
            let uri = listOfSelectedElements[j].id.substring(indexWhereUriIs);
            this.props.addTrackToPlaylist(uri, listOfSelectedElementsSongName[j], leftPos-1, this.props.index);
            let newString = "trackCard"+amountOfTracksOnLeftDiv+"pos:"+(leftPos-1)+"uri:spotify:track:"+uri;
            listOfSelectedElements[j].id = newString;
            listOfSelectedElements[j].onclick = (e) => {
                handleClick(newString);
                e.stopPropagation();
            };
            amountOfTracksOnLeftDiv!++;
            // leftListOfTrackCardsDiv?.appendChild(listOfSelectedElements[j])
        }
        let updatedListOfTrackCardsDiv = document.getElementById(str)?.getElementsByTagName("div")[5];
        let newDivChildren = updatedListOfTrackCardsDiv?.children;
        let amountOfTracksOnOriginalDiv = newDivChildren?.length;
        for(let k = 0; k < newDivChildren!.length;k++){
            let indexWhereUriIs = newDivChildren![k].id.indexOf("track", 27) + 6;
            let uri = newDivChildren![k].id.substring(indexWhereUriIs);
            let nextString = "trackCard"+k+"pos:"+this.props.index+"uri:spotify:track"+uri;
            newDivChildren![k].id = nextString;
            (newDivChildren![k] as HTMLButtonElement).onclick = (e) => {
                handleClick(nextString);
                e.stopPropagation();}; 
        }
    }
    moveRight(){
        let rightPos = this.props.index + 2;
        if(rightPos === 4){
            rightPos = 1;
        }
        let str = "playlistAndRefreshButton"+(this.props.index+1)
        // console.log(str);
        let playlistAndRefreshButtonDiv = document.getElementById(str);
        let listOfTrackCardsDiv = playlistAndRefreshButtonDiv?.getElementsByTagName("div")[5];
        // console.log(listOfTrackCardsDiv);
        let children = listOfTrackCardsDiv!.children;
        let childNodes = listOfTrackCardsDiv!.childNodes;
        let listOfSelectedElements = []
        let listOfSelectedElementsSongName = [];
        for(let i = 0; i < children.length; i++){
            if(children[i].className === "selected"){
                let newChild : HTMLButtonElement  = children.item(i) as HTMLButtonElement;
                console.log(newChild);
                console.log(newChild.innerText);
                listOfSelectedElements.push(newChild);
                listOfSelectedElementsSongName.push(newChild.innerText);
            }
        }
        // console.log(rightPos);
        // console.log(listOfSelectedElements);
        let rightStr = "playlistAndRefreshButton"+(rightPos);
        // Get div containing the right playlist
        let rightPlaylistAndRefreshButtonDiv = document.getElementById(rightStr);
        let rightListOfTrackCardsDiv = rightPlaylistAndRefreshButtonDiv?.getElementsByTagName("div")[5];
        // console.log(rightListOfTrackCardsDiv);
        let amountOfTracksOnRightDiv = rightListOfTrackCardsDiv?.children.length;
        // console.log(amountOfTracksOnRightDiv);
        for(let j = 0; j < listOfSelectedElements.length;j++){
            console.log(listOfSelectedElements[j].id);
            let indexWhereUriIs = listOfSelectedElements[j].id.indexOf("track", 27) + 6;
            let uri = listOfSelectedElements[j].id.substring(indexWhereUriIs);
            this.props.addTrackToPlaylist(uri, listOfSelectedElementsSongName[j],rightPos-1, this.props.index);
            let newString = "trackCard"+amountOfTracksOnRightDiv+"pos:"+(rightPos-1)+"uri:spotify:track:"+uri;
            console.log(newString);
            listOfSelectedElements[j].id = newString;
            listOfSelectedElements[j].onclick = (e) => {
                handleClick(newString);
                e.stopPropagation();
            };
            // console.log(listOfSelectedElements[j].onclick?.toString());
            amountOfTracksOnRightDiv!++;
            // rightListOfTrackCardsDiv?.appendChild(listOfSelectedElements[j])
        }
        let updatedListOfTrackCardsDiv = document.getElementById(str)?.getElementsByTagName("div")[5];
        let newDivChildren = updatedListOfTrackCardsDiv?.children;
        let amountOfTracksOnOriginalDiv = newDivChildren?.length;
        for(let k = 0; k < newDivChildren!.length;k++){
            let indexWhereUriIs = newDivChildren![k].id.indexOf("track", 27) + 6;
            let uri = newDivChildren![k].id.substring(indexWhereUriIs);
            let nextString = "trackCard"+k+"pos:"+this.props.index+"uri:spotify:track:"+uri;
            newDivChildren![k].id = nextString;
            (newDivChildren![k] as HTMLButtonElement).onclick = (e) => {
                handleClick(nextString);
                e.stopPropagation();}; 
        }
        this.setState({});
    }
    render(){
        let toDisplayTackComponent = (this.props.displayTrackComponent === "true");
        let last100Number = this.state.trackRangeCounter - 100;
        let next100Number = this.state.trackRangeCounter + 100;
        if(this.props.playlist.trackAmount < 100){
            last100Number = 0;
            next100Number = 0;
        }
        if(last100Number < 0){
            last100Number = 0;
        }
        if(next100Number >= this.props.playlist.trackAmount){
            next100Number = this.state.trackRangeCounter;
        }
        // console.log("last100Number: "+last100Number);
        // console.log("next100Number: "+next100Number);
        // console.log(this.props.playlist);
        // console.log("trackRangeCounter "+this.state.trackRangeCounter);
        if(this.state.firstCall || this.props.playlist.id !== this.state.playlistID){
            this.tracks = this.props.tracks;
        }else{
            this.tracks = this.state.songDict;
        }
        // console.log(this.state.songDict);
        // console.log(this.tracks);
        // console.log(this.props.playlist);
        return(
            <React.Fragment>
                <div id="RefreshPlaylistAndParentFlexSpacer"></div>
                <div id="parentFlex">
                    <div id="tracks">
                        {toDisplayTackComponent  && <TracksComponent tracks={this.tracks} index={this.props.index}/>}
                        {toDisplayTackComponent && <div className="trackButtonFlex">
                            <input type="button" value="Last 100 Tracks" onClick={() => {
                                this.ifClickedLast = true;
                                fetchTracks(this.props.playlist!.id, last100Number, this.props.index,
                                this.updateScaleStateAfterAddingTracks.bind(this))}}></input>
                            <input type="button" value="Next 100 Tracks"
                            onClick={() => {
                            this.ifClickedLast = false;    
                            fetchTracks(this.props.playlist!.id, next100Number, this.props.index,
                            this.updateScaleStateAfterAddingTracks.bind(this))}
                            }></input>
                        </div> }
                        {toDisplayTackComponent && <div className="trackButtonFlex">
                            <input type="button" value="Move Selected Left" onClick={() => this.moveLeft()}></input>
                            <input type="button" value="Move Selected Right" onClick={() => this.moveRight()}></input></div>}
                        {toDisplayTackComponent && <div className="trackButtonFlex">
                            <input type="button" id="addMovedTracks" value="Add Moved Tracks to Playlist" onClick={() => this.addItemsToPlaylist()}></input>
                            </div>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
    addItemsToPlaylist(){
        let url = SpotifyInfo.tracks_url;
        if(this.state.playlistID != undefined){
            url = url.replace("{{PlaylistId}}", this.state.playlistID);
        }else{
            url = url.replace("{{PlaylistId}}", this.props.playlist.id);
        }
        console.log(url);
        console.log(this.props.tracksToAddToPlaylist);
        let tracksDisplayed = this.props.tracks;
        console.log(tracksDisplayed);
        console.log(this.state.songDict);
        console.log(this.props.tracksToAddToPlaylist.map(ele => '"' + ele + '"').toString());
        console.log(JSON.stringify(this.props.tracksToAddToPlaylist.map(ele => '"' + ele + '"').toString()));
        let obj = this.props.tracksToAddToPlaylist.map(ele => '"' + ele + '"').toString()
        // console.log(JSON.stringify([this.props.tracksToAddToPlaylist.toLocaleString()]))
        // console.log(JSON.parse(this.props.tracksToAddToPlaylist.toString()));
        console.log(Object.values(this.props.tracksToAddToPlaylist));
        // No space betwee values in toString()
        if(this.props.tracksToAddToPlaylist.length > 0){
            let body = {
                "uris": 
                    Object.values(this.props.tracksToAddToPlaylist)
                        // "spotify:track:4Y2glvLjQGOb4dXnwm1hQf", "spotify:track:5aZCwTIsfqv22p5bewcrgf"
                    ,
                "position": (Object.keys(tracksDisplayed.dictionary).length - Object.keys(this.props.tracksToAddToPlaylist).length)
            }
            console.log(body);
            callApi("POST", url, JSON.stringify(body), sessionStorage.getItem("client_id"), sessionStorage.getItem("access_token")).then(
                (data) =>
            {
                console.log(data);
            });
        }
    }
    updateScaleStateAfterAddingTracks(index: number, songDict?: SongDictionary, playlistID?: string){
        // console.log(songDict);
        let newNum = 0
        let trackAmountToTrackRangeCounterDifference = this.props.playlist.trackAmount - this.state.trackRangeCounter
        if(!this.ifClickedLast){
            if(this.props.playlist.trackAmount > 100 && trackAmountToTrackRangeCounterDifference > 100){
                newNum = this.state.trackRangeCounter + 100
            }else{
                newNum = this.state.trackRangeCounter;
            }
        }
        else{
            let newLastOffset = this.state.trackRangeCounter - 100
            if(newLastOffset < 0){
                newNum = 0
            }else{
                newNum = newLastOffset
            }
        }
        let newFirstCall = false;
        // console.log(this.state.playlistID);
        // console.log(playlistID);
        // if(this.state.playlistID != undefined && this.state.playlistID !== playlistID){
        //     newFirstCall = true;
        // }
        this.setState({songDict: songDict!,
            trackRangeCounter: newNum,
            playlistID: playlistID,
            prevTracks: this.tracks,
            firstCall: newFirstCall},
         () => {
         });
      }
}