import React, { Component } from "react";

class LoginSpot extends Component{
    state: any;
    constructor(props: any){
      super(props);
      this.state = {
          weather: "Not gotten the weather yet"
      };  
    }
    getState(){
      return this.state.weather;
    }
    render() {
      return (
        <div>
          <p>The weather is: {this.state.weather} </p>
        </div>
      );
    }
}

export default LoginSpot;