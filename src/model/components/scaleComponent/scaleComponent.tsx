import React from "react";
import { Component } from "react";
import { TracksComponent } from "../tracksComponent/tracksComponent";
import './scaleComponent.scss';
export class ScaleComponent extends Component{

    getTracksFromSelectedPlaylist(){
        // TODO:
    }
    render(){
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
                        <input type="button" value="Get tracks from selected playlist" onClick={() => this.getTracksFromSelectedPlaylist()}></input>
                        {<TracksComponent />}
                    </div>
                </div>
            </React.Fragment>
        )
        
    }
}