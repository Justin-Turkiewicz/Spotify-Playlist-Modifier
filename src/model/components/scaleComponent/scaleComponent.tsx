import React from "react";
import { Component } from "react";
import './scaleComponent.scss';
export class ScaleComponent extends Component{

    render(){
        return(
            <React.Fragment>
                <div id="scaleRow">
                    <input type="button" value="Skip"></input>
                    <input type="button" value="1"></input> 
                    <input type="button" value="2"></input>
                    <input type="button" value="3"></input>
                    <input type="button" value="4"></input>
                    <input type="button" value="5"></input>
                </div>
            </React.Fragment>
        )
        
    }
}