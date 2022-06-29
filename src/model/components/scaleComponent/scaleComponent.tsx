import React from "react";
import { Component } from "react";
import { TracksComponent } from "../tracksComponent/tracksComponent";
import './scaleComponent.scss';
interface ScaleProps{
    displayTrackComponent: string
    tracks?: {[id: string]: string}
}
interface scaleStates{
    displayTrackComponent: string
    songDict: {[id: string]: string}
}
export class ScaleComponent extends Component<ScaleProps, scaleStates>{

    constructor(props: ScaleProps){
        super(props);
        console.log(props.displayTrackComponent);
        this.state = {
            displayTrackComponent: props.displayTrackComponent,
            songDict: props.tracks!
        }

    }
    static getDerivedStateFromProps(props: ScaleProps, state: scaleStates){
        return {songDict: props.tracks!}
    }  
    render(){
        let toDisplayTackComponent = (this.state.displayTrackComponent === "true");
        // console.log(this.state.songDict);
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
                        {toDisplayTackComponent && <TracksComponent tracks={this.state.songDict}/>}
                    </div>
                </div>
            </React.Fragment>
        )
        
    }
}