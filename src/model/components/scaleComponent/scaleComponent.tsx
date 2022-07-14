import React from "react";
import { Component } from "react";
import { fetchTracks } from "../../../packages/spotifyAPICalls/spotifyAPICalls";
import { Playlist } from "../../playlist/playlist";
import { SongDictionary } from "../../songDictionary/songDictionary";
import { TracksComponent } from "../tracksComponent/tracksComponent";
import './scaleComponent.scss';
interface ScaleProps{
    displayTrackComponent: string
    tracks: SongDictionary
    playlist: Playlist
    index: number
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

        console.log("last100Number: "+last100Number);
        console.log("next100Number: "+next100Number);
        // console.log(this.props.playlist);
        console.log("trackRangeCounter "+this.state.trackRangeCounter);
        if(this.state.firstCall || this.props.playlist.id !== this.state.playlistID){
            this.tracks = this.props.tracks;
        }else{
            this.tracks = this.state.songDict;
        }
        console.log(this.state.songDict);
        console.log(this.tracks);
        console.log(this.props.playlist);
        return(
            <React.Fragment>
                <div id="RefreshPlaylistAndParentFlexSpacer"></div>
                <div id="parentFlex">
                    <div id="tracks">
                        {toDisplayTackComponent  && <TracksComponent tracks={this.tracks}/>}
                        {toDisplayTackComponent && <div id="trackButtonFlex">
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

                    </div>
                </div>
            </React.Fragment>
        )
    }
    updateScaleStateAfterAddingTracks(index: number, songDict?: SongDictionary, playlistID?: string){
        console.log(songDict);
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
        console.log(this.state.playlistID);
        console.log(playlistID);
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