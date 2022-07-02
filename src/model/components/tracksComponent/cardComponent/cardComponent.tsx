import React, { Component, ReactNode } from "react";
import { SongDictionary } from "../../../songDictionary/songDictionary";
import "./cardComponent.scss";
interface CardProps{
    tracks: SongDictionary;
}
export class CardComponent extends Component<CardProps>{
    songName = "Track 1";
    songNumber = "1";

    constructor(props: CardProps){
        super(props);
    }
    handleClick(idName: string){
        
       let currentButton = document.getElementById(idName)
       if(!currentButton?.classList.contains("selected")){
        currentButton?.classList.add("selected");
        currentButton?.classList.remove("unselected");
       }else{
        currentButton?.classList.remove("selected");
        setTimeout(() => {
            currentButton?.classList.add("unselected");
        }, 1000)

       }
    }
    songDictionaryDefined(){
        return this.props.tracks! != undefined;
    }
    songDictionaryDictionaryDefined(){
        return this.props.tracks.dictionary! != undefined;
    }
    createTracksOnPage(){
        let trackCards = [];
        for(let i = 0;i<Object.keys(this.props.tracks.dictionary).length;i++) {
            let idName = "trackCard"+i
            // console.log(this.state.songDict[i]);
            trackCards.push(<button id={idName} key={i} className="unselected" onClick={() => this.handleClick(idName)}>
                <label className="songNames">{this.props.tracks!.dictionary![i]}</label>
                {/* <div className="songNumbers">{this.songNumber}</div> */}
            </button>);
        }
    // console.log(trackCards);
    return <div id="listOfTrackCards">{trackCards}</div>;
}
    render(): ReactNode {
        return(
            <React.Fragment>
                {this.songDictionaryDefined() && this.songDictionaryDictionaryDefined() && this.createTracksOnPage()}
            </React.Fragment>
        );
    }
}