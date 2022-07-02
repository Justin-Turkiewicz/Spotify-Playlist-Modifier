import React from "react";
import { Component } from "react";
import { fetchTracks } from "../../../packages/spotifyAPICalls/spotifyAPICalls";
import { SongDictionary } from "../../songDictionary/songDictionary";
import { TracksComponent } from "../tracksComponent/tracksComponent";
import './scaleComponent.scss';
interface ScaleProps{
    displayTrackComponent: string
    tracks: SongDictionary
    playlistID?: string
    index: number
}
interface scaleStates{
    trackRangeCounter: number
    songDict: SongDictionary
    playlistID?: string
}
export class ScaleComponent extends Component<ScaleProps, scaleStates>{
    ifClickedLast: boolean
    constructor(props: ScaleProps){
        super(props);
        this.ifClickedLast = false;
        this.state = {
            trackRangeCounter: 0,
            songDict: new SongDictionary(),
        }

    } 
    render(){
        let toDisplayTackComponent = (this.props.displayTrackComponent === "true");
        let last100Number = this.state.trackRangeCounter - 100;
        if(last100Number < 0){
            last100Number = 0;
        }
        let next100Number = this.state.trackRangeCounter + 100;
        console.log("next100Number: "+next100Number);
        console.log("trackRangeCounterAfterUpdate: "+this.state.trackRangeCounter);
        let tracks;
        if(this.state.playlistID === this.props.playlistID && this.state.songDict !== undefined){
            tracks = this.state.songDict;
        }else{
            tracks = this.props.tracks;
        }
        console.log(tracks);
        // console.log(this.state.songDict);
        return(
            <React.Fragment>
                <div id="RefreshPlaylistAndParentFlexSpacer"></div>
                <div id="parentFlex">
                    {/* <div id="scaleRow">
                        {/* <input type="button" value="Skip"></input>
                        <input type="button" value="1"></input> 
                        <input type="button" value="2"></input>
                        <input type="button" value="3"></input>
                        <input type="button" value="4"></input>
                        <input type="button" value="5"></input>
                        <input type="button" value="Create Playlists"></input>
                    </div> */}
                    <div id="tracks">
                        {toDisplayTackComponent && <TracksComponent tracks={tracks}/>}
                        {toDisplayTackComponent && <div id="trackButtonFlex">
                            <input type="button" value="Last 100 Tracks" onClick={() => {
                                this.ifClickedLast = true;
                                fetchTracks(this.props.playlistID!, last100Number, this.props.index,
                                this.updateScaleStateAfterAddingTracks.bind(this))}}></input>
                            <input type="button" value="Next 100 Tracks"
                            onClick={() => fetchTracks(this.props.playlistID!, next100Number, this.props.index,
                            this.updateScaleStateAfterAddingTracks.bind(this))}></input>
                        </div> }

                    </div>
                </div>
            </React.Fragment>
        )
    }
    updateScaleStateAfterAddingTracks(index: number, songDict?: SongDictionary, playlistID?: string){
        // console.log(songDict);
        // console.log(playlistID);
        console.log("Index: "+this.props.index+ " trackingRangeCounter: "+this.state.trackRangeCounter);
        let newNum = this.state.trackRangeCounter + 100;
        console.log("Clicked Last: "+this.ifClickedLast);
        if(this.ifClickedLast){
            newNum = this.state.trackRangeCounter - 100;
            if(newNum < 0){
                newNum = 0;
            }
            this.ifClickedLast = false;
        }
        console.log("newNum After If Statement: "+newNum);
        this.setState({songDict: songDict!,
            trackRangeCounter: newNum,
            playlistID: this.props.playlistID!},
         () => {
         });
      }
}