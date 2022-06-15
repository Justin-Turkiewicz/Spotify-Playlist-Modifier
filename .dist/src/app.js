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
const main_1 = __importDefault(require("./main"));
require("./app.css");
const spotify_info_1 = require("./constants/spotify_info");
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.body = "";
        this.xhr = new XMLHttpRequest();
    }
    pageLoaded() {
        // Query String exists
        if (window.location.search.length > 0) {
            this.handleRedirect();
        }
    }
    handleRedirect() {
        let code = this.getCode();
        if (code != null) {
            this.fetchAccessToken(code);
        }
        window.history.pushState("", "", spotify_info_1.SpotifyInfo.redirect_uri);
    }
    fetchAccessToken(code) {
        this.body += 'grant_type=authorization_code';
        this.body += "&code=" + code;
        this.body += "&redirect_uri=" + encodeURI(spotify_info_1.SpotifyInfo.redirect_uri);
        this.body += "&client_id=" + spotify_info_1.SpotifyInfo.client_id;
        this.body += "&client_secret=" + spotify_info_1.SpotifyInfo.client_secret;
        this.callAuthorizationApi(this.body);
    }
    callAuthorizationApi(body) {
        this.xhr.open("POST", spotify_info_1.SpotifyInfo.token, true);
        this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        this.xhr.setRequestHeader('Authorization', 'Basic ' + btoa(spotify_info_1.SpotifyInfo.client_id + ":" + spotify_info_1.SpotifyInfo.client_secret));
        this.xhr.send(this.body);
        this.xhr.onload = this.handleAuthorizationResponse;
    }
    handleAuthorizationResponse() {
        if (this.xhr.status == 200) {
            var data = JSON.parse(this.xhr.responseText);
            console.log(data);
            var data = JSON.parse(this.xhr.responseText);
            if (data.access_token != undefined) {
                let access_token = data.access_token;
                localStorage.setItem("access_token", access_token);
            }
            if (data.refresh_token != undefined) {
                let refresh_token = data.refresh_token;
                localStorage.setItem("refresh_token", refresh_token);
            }
        }
        else {
            console.log(this.xhr.responseText);
            alert(this.xhr.responseText);
        }
    }
    getCode() {
        let code = null;
        // If Query String exists, get the code param 
        if (window.location.search.length > 0) {
            const urlParams = new URLSearchParams(querystring);
            code = urlParams.get('code');
        }
        return code;
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { id: "MainParent", onLoad: this.pageLoaded },
                React.createElement(main_1.default, null))));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map