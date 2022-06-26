import React from "react";
import { Component } from "react";
import { TracksComponent } from "../tracksComponent/tracksComponent";
import './scaleComponent.scss';
interface scaleProps{
    displayTrackComponent: string
}
interface scaleStates{
    displayTrackComponent: string
}
export class ScaleComponent extends Component<scaleProps, scaleStates>{
    constructor(props: scaleProps){
        super(props);
        this.state = {
            displayTrackComponent: props.displayTrackComponent
        }
    }
    getTracksFromSelectedPlaylist(){
    }
    render(){
        let toDisplayTackComponent = (this.state.displayTrackComponent === "true");
        return(
            <React.Fragment>
                <div id="parentFlex">
                    <div id="scaleRow">
                        <input type="button" value="Skip"></input>
                        <input type="button" value="1"></input> 
                        <input type="button" value="2"></input>
                        <input type="button" value="3"></input>
                        <input type="button" value="4"></input>
                        <input type="button" value="5"></input>
                        <input type="button" value="Create Playlists"></input>
                    </div>
                    <div id="tracks">
                        <input id="getTracksFromSelectedPlaylistButton" type="button" value="Get tracks from selected playlist" onClick={() => this.getTracksFromSelectedPlaylist()}></input>
                        {toDisplayTackComponent && <TracksComponent />}
                    </div>
                </div>
            </React.Fragment>
        )
        
    }
}