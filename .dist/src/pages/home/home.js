"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const loginSpot_1 = __importDefault(require("../../model/loginSpot"));
const navbar_1 = __importDefault(require("../navbar/navbar"));
require("./home.scss");
class Home extends React.Component {
    // loginSpot: LoginSpot
    constructor(props) {
        super(props);
        this.addSpot = (email, password) => {
            this.email = email;
            this.password = password;
            this.setState({ displayLoginSpot: true }, () => {
                console.log("State login: " + this.state.displayLoginSpot);
                // console.log("LoginSpot EmailOrUsnermae: "+this.loginSpot.);
                // console.log("LoginSpot password: "+this.loginSpot.getPassword());
            });
        };
        this.loginSpotify = (email, password) => {
            console.log(email);
            console.log(password);
        };
        this.email = "";
        this.password = "";
        // this.loginSpot = new LoginSpot(props, "", "");
        this.state = {
            displayLoginSpot: false
        };
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { id: "topBackground" },
                React.createElement("div", { className: "container", id: "homeContainer" },
                    React.createElement(navbar_1.default, null),
                    React.createElement("div", { className: "row justify-content-center", id: "secondRow" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12 col-lg-12", id: "title" },
                            React.createElement("h1", null, "ClassifyTheSpot")),
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12 col-lg-12", id: "gistOfThePurpose" },
                            React.createElement("p", null, "ClassifyTheSpot allows you to rank your songs on your Spotify account with a self-defined scale and creates seperate playlists for the songs in each tier of the scale."))),
                    React.createElement("div", { className: "row", id: "loginRow" },
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12 col-lg-12", id: "spotUsername" },
                            React.createElement("input", { type: "text", id: "emailUsername", name: "emailOrUsername", placeholder: "Enter Email or Username" })),
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12 col-lg-12", id: "spotUsername" },
                            React.createElement("input", { type: "text", id: "password", name: "password", placeholder: "Enter Password" })),
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12 col-lg-12", id: "spotUsername" },
                            React.createElement("button", { id: "logInSpotify", onClick: () => this.addSpot(document.getElementById("emailUsername").value, document.getElementById("password").value) }, "Log In")))),
                this.state.displayLoginSpot && (React.createElement(loginSpot_1.default, { eOu: this.email, pass: this.password })))));
    }
}
exports.default = Home;
//# sourceMappingURL=home.js.map