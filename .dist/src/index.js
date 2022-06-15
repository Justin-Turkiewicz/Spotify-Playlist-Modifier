"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const app_1 = __importDefault(require("./app"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const react_router_dom_1 = require("react-router-dom");
require("bootstrap/dist/css/bootstrap.min.css");
const htmlRoot = document.getElementById('root');
const root = client_1.default.createRoot(htmlRoot);
root.render((react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(app_1.default, null))));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
//# sourceMappingURL=index.js.map