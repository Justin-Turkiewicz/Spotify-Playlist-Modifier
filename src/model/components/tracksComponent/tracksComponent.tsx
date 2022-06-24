import React, { Component, ReactNode } from 'react';
import { CardComponent } from './cardComponent/cardComponent';
import './tracksComponent.scss';

export class TracksComponent extends Component{
    
    render(): ReactNode {
        return(
            <React.Fragment>
                <div id="tracksArray">
                    {<CardComponent numOfCards={10}/>}
                </div>

            </React.Fragment>
        );
    }
}