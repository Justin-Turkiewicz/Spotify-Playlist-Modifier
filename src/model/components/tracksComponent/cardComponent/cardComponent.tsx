import React, { Component, ReactNode } from "react";
import { handleClick } from "../../../../packages/spotifyAPICalls/spotifyAPICalls";
import { SongDictionary } from "../../../songDictionary/songDictionary";
import "./cardComponent.scss";
interface CardProps{
    tracks: SongDictionary;
    index: number;
}
export class CardComponent extends Component<CardProps>{
    constructor(props: CardProps){
        super(props);
    }
    // componentDidUpdate(prevProps: any){
    //     if(this.props.tracks != prevProps.tracks){
    //         this.setState({}, () => {});
    //     }
    // }
    songDictionaryDefined(){
        return this.props.tracks! != undefined;
    }
    songDictionaryDictionaryDefined(){
        return this.props.tracks.dictionary! != undefined;
    }
    createTracksOnPage()  {
        let trackCards = [];

        for(let i = 0;i<Object.keys(this.props.tracks.dictionary).length;i++) {
            let idName = "trackCard"+i+"pos:"+this.props.index+"uri:"+this.props.tracks.dictionaryURI[i];
            // console.log(this.state.songDict[i]);
            // console.log(this.props.tracks.dictionaryURI[i]);
            trackCards.push(<button id={idName} key={i} className="unselected" onClick={(e) => { 
                handleClick(idName);
                e.stopPropagation();}}>
                <label className="songNames">{this.props.tracks!.dictionary![i]}</label>
                {/* <div className="songNumbers">{this.songNumber}</div> */}
            </button>);
        }
    return <div id="listOfTrackCards">{trackCards}</div>;
    // return trackCards;
}
    render(): ReactNode {
        return(
            <React.Fragment>
                {this.songDictionaryDefined() && this.songDictionaryDictionaryDefined() && this.createTracksOnPage()}
            </React.Fragment>
        );
    }
}