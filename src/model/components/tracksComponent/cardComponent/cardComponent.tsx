import React, { Component, ReactNode } from "react";
import "./cardComponent.scss";
interface CardProps{
    tracks?: {[id: string]: string};
}
interface CardState{
    songDict: {[id: string]: string}
}
export class CardComponent extends Component<CardProps, CardState>{
    songName = "Track 1";
    songNumber = "1";

    constructor(props: CardProps){
        super(props);
        this.state = {
            songDict: props.tracks!
        }
    }
    static getDerivedStateFromProps(props: CardProps, state: CardState){
        return {songDict: props.tracks!};
    }
    createTracksOnPage(){
        let trackCards = [];
        for(let i = 0;i<Object.keys(this.state.songDict).length;i++) {
            let idName = "trackCard"+i
            console.log(this.state.songDict[i]);
            trackCards.push(<div id={idName} key={i}>
                <div className="songNames">{this.state.songDict[i]}</div>
                {/* <div className="songNumbers">{this.songNumber}</div> */}
            </div>);
        }
    console.log(trackCards);
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