import React, { Component, ReactNode } from "react";
import "./cardComponent.scss";
interface CardProps{
    tracks?: {[id: string]: string};
}
export class CardComponent extends Component<CardProps>{
    songName = "Track 1";
    songNumber = "1";

    constructor(props: CardProps){
        super(props);
    }
    createTracksOnPage(){
        let trackCards = [];
        for(let i = 0;i<Object.keys(this.props.tracks!).length;i++) {
            let idName = "trackCard"+i
            // console.log(this.state.songDict[i]);
            trackCards.push(<div id={idName} key={i}>
                <div className="songNames">{this.props.tracks![i]}</div>
                {/* <div className="songNumbers">{this.songNumber}</div> */}
            </div>);
        }
    // console.log(trackCards);
    return <div id="listOfTrackCards">{trackCards}</div>;
}
    render(): ReactNode {
        return(
            <React.Fragment>
                {this.createTracksOnPage()}
            </React.Fragment>
        );
    }
}