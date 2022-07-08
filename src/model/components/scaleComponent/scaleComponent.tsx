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
            prevTracks: new SongDictionary()
        }

    } 
    render(){
        let toDisplayTackComponent = (this.props.displayTrackComponent === "true");
        let last100Number = 0;
        let next100Number = 0;
        console.log("last100Number: "+last100Number);
        console.log("next100Number: "+next100Number);
        console.log(this.props.playlist);
        return(
            <React.Fragment>
                <div id="RefreshPlaylistAndParentFlexSpacer"></div>
                <div id="parentFlex">
                    <div id="tracks">
                        {toDisplayTackComponent  && <TracksComponent tracks={this.props.tracks}/>}
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
        let newNum = 0;
        this.setState({songDict: songDict!,
            trackRangeCounter: newNum,
            playlistID: this.props.playlist!.id,
            prevTracks: this.tracks},
         () => {
         });
      }
}