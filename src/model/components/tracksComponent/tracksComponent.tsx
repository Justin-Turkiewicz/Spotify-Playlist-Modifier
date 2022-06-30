import React, { Component, ReactNode } from 'react';
import { CardComponent } from './cardComponent/cardComponent';
import './tracksComponent.scss';
interface TrackProps{
    tracks?: {[id: string]: string}
}
export class TracksComponent extends Component<TrackProps>{

    constructor(props: TrackProps){
        super(props);
    }
    render(): ReactNode {
        return(
            <React.Fragment>
                <div id="tracksArray">
                    {<CardComponent tracks={this.props.tracks!}/>}
                </div>

            </React.Fragment>
        );
    }
}