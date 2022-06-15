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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const spotify_info_1 = require("../constants/spotify_info");
class LoginSpot extends react_1.Component {
    constructor(props, emailOrUsername, password) {
        super(props);
        this.componentDidMount = () => {
            let url = spotify_info_1.SpotifyInfo.authorize;
            url += "?client_id=" + spotify_info_1.SpotifyInfo.client_id;
            url += "&response_type=code";
            url += "&redirect_uri=" + encodeURI(spotify_info_1.SpotifyInfo.redirect_uri);
            url += "&show_dialog=true";
            url += "&scope=user-read-private user-read-email";
            window.location.href = url;
            // axios.get('http://localhost:5000/testAPI',{
            //   data: "hi",
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/json',
            //     'Authorization': this.state.emailOrUsername,
            //     'Access-Control-Allow-Origin': 'http://localhost:3000'
            //     // 'Origin': 'http://localhost:3000',
            //   }
            // }).then(res => {
            //   console.log(res);
            // }
            // )
        };
        this.state = {
            emailOrUsername: emailOrUsername,
            password: password
        };
    }
    static getDerivedStateFromProps(props, state) {
        return { emailOrUsername: props.eOu,
            password: props.pass };
    }
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("p", null,
                "The user logged in.",
                react_1.default.createElement("br", null),
                "Email or Username: ",
                this.state.emailOrUsername,
                " ",
                react_1.default.createElement("br", null),
                "Password: ",
                this.state.password,
                " ")));
    }
}
exports.default = LoginSpot;
//# sourceMappingURL=loginSpot.js.map