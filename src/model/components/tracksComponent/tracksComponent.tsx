import React, { Component, ReactNode } from 'react';
import { SongDictionary } from '../../songDictionary/songDictionary';
import { CardComponent } from './cardComponent/cardComponent';
import './tracksComponent.scss';
interface TrackProps{
    tracks: SongDictionary;
    index: number;
}
export class TracksComponent extends Component<TrackProps>{

    constructor(props: TrackProps){
        super(props);
    }
    render(): ReactNode {
        return(
            <React.Fragment>
                <div id="tracksArray">
                    {<CardComponent tracks={this.props.tracks} index={this.props.index}/>}
                </div>

            </React.Fragment>
        );
    }
}