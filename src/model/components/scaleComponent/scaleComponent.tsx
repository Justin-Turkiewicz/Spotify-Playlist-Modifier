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
    prevTracks: SongDictionary
}
export class ScaleComponent extends Component<ScaleProps, scaleStates>{
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
        console.log("In render, trackRangeCounter: "+this.state.trackRangeCounter);
        // If state and props playlistID do not match(Meaning a new playlist was called), then tracks is updated to
        // the props tracks as it contains the new playlist
        if(this.state.playlistID != this.props.playlistID){
            this.tracks = this.props.tracks;
            // With a new playlist, updateCannotClickNextAgain is reset
            this.updateCannotClickNextAgain = false;
        }
        // Otherwise, the state contains the new tracks to be loaded from the current playlist
        else{
            this.tracks = this.state.songDict;
        }
        // Gets length of dictionary in tracks
        let dictionaryLength = Object.keys(this.tracks.dictionary).length;
        let prevDictionaryLength = Object.keys(this.state.prevTracks.dictionary).length;
        // If dictionaryLength is 0, implying that the dictionary is empty
        // If we cannot click next again, set tracks back to the previous tracks
        console.log(this.tracks);
        console.log(this.state.prevTracks);
        console.log(this.state.songDict);
        if(this.updateCannotClickNextAgain){
            if(dictionaryLength == 100){
                this.tracks = this.state.prevTracks;
            }
            dictionaryLength = Object.keys(this.tracks.dictionary).length;
        }
        // Set last Offset number if getting last 100 tracks to the trackRangeCounter minus the dictionary's length
        let last100Number = this.state.trackRangeCounter - dictionaryLength;
        // If less than 0, set offset to 0
        if(last100Number < 0){
            last100Number = 0;
        }
        // The next offset number would be the trackRangeCounter plus the dictionary's length
        let next100Number = this.state.trackRangeCounter + dictionaryLength;
        console.log("this.updateCannotClickNextAgain: "+this.updateCannotClickNextAgain);
        // Prevents next100Number from going over the greatest possible offset of the playlist
        if(this.updateCannotClickNextAgain){
            last100Number = this.state.trackRangeCounter;
            next100Number = this.state.trackRangeCounter + 100;
        }
        console.log("last100Number: "+last100Number);
        console.log("next100Number: "+next100Number);
        // console.log(this.state.songDict);
        return(
            <React.Fragment>
                <div id="RefreshPlaylistAndParentFlexSpacer"></div>
                <div id="parentFlex">
                    <div id="tracks">
                        {toDisplayTackComponent  && <TracksComponent tracks={this.tracks}/>}
                        {toDisplayTackComponent && <div id="trackButtonFlex">
                            <input type="button" value="Last 100 Tracks" onClick={() => {
                                this.ifClickedLast = true;
                                fetchTracks(this.props.playlistID!, last100Number, this.props.index,
                                this.updateScaleStateAfterAddingTracks.bind(this))}}></input>
                            <input type="button" value="Next 100 Tracks"
                            onClick={() => {
                            this.ifClickedLast = false;    
                            fetchTracks(this.props.playlistID!, next100Number, this.props.index,
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
        console.log(this.tracks);
        // console.log(playlistID);
        // newNum is defaulted to the state's trackRangeCounter
        let newNum = this.state.trackRangeCounter;
        let songDictDictionaryLength = Object.keys(songDict!.dictionary).length;
        // As in the render, ifClickedLast was pressed we decrease newNum according to the dictionary's length
        if(this.ifClickedLast){
            newNum -= songDictDictionaryLength;
            if(newNum < 0){
                newNum = 0;
            }
            if(this.updateCannotClickNextAgain){
                newNum = this.state.trackRangeCounter;
            }
            this.updateCannotClickNextAgain = false;
        }
        if(songDictDictionaryLength < 100){
            // If dictionary is empty, then we cannot click next again
            this.updateCannotClickNextAgain = true;
        }
        console.log("Outside of render, this.updateCannotClickNextAgain: "+this.updateCannotClickNextAgain);
        console.log(newNum);
        // If we clicked next and it is possible, increase newNum by the dictionary's length
        if(!this.updateCannotClickNextAgain && !this.ifClickedLast){
            newNum += songDictDictionaryLength;
        }
        console.log("Clicked Last: "+this.ifClickedLast);
        console.log("newNum After If Statement: "+newNum);
        this.setState({songDict: songDict!,
            trackRangeCounter: newNum,
            playlistID: this.props.playlistID!,
            prevTracks: this.tracks},
         () => {
         });
      }
}