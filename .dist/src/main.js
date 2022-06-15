"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const home_1 = __importDefault(require("./pages/home/home"));
class Main extends react_1.default.Component {
    render() {
        return (react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(home_1.default, null) })));
    }
}
exports.default = Main;
//# sourceMappingURL=main.js.map