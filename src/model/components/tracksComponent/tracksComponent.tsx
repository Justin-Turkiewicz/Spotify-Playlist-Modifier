import React, { Component, ReactNode } from 'react';
import { CardComponent } from './cardComponent/cardComponent';
import './tracksComponent.scss';
interface TrackProps{
    tracks?: {[id: string]: string}
}
interface TrackState{
    songDict: {[id: string]: string};
}
export class TracksComponent extends Component<TrackProps, TrackState>{

    constructor(props: TrackProps){
        super(props);
        this.state = { 
           songDict: props.tracks!
        }
    }
    static getDerivedStateFromProps(props: TrackProps, state: TrackState){
        return {songDict: props.tracks!};
    }
    render(): ReactNode {
        return(
            <React.Fragment>
                <div id="tracksArray">
                    {<CardComponent tracks={this.state.songDict}/>}
                </div>

            </React.Fragment>
        );
    }
}