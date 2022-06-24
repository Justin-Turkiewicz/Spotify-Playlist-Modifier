import React, { Component, ReactNode } from "react";
import "./cardComponent.scss";
interface cardProps{
    numOfCards: number;
}
export class CardComponent extends Component<cardProps>{

    constructor(props: cardProps){
        super(props);
    }
    createTracksOnPage(props: any){
        let trackCards = [];
        for(let i = 0;i<10;i++) {
            let idName = "trackCard"+i
            trackCards.push(<div id={idName} ></div>);
        }
    return <div id="listOfTrackCards">{trackCards}</div>;
}
    render(): ReactNode {
        return(
            <React.Fragment>
                {this.createTracksOnPage(this.props.numOfCards)}
            </React.Fragment>
        );
    }
}