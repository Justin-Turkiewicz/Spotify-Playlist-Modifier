"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
const whiteList = 'http://localhost:3000';
const corsOptions = {
    origin: "http://localhost:3000",
};
const cors = require("cors");
app.use(cors({
    corsOptions
}));
var testAPIRouter = require("./routes/testAPI");
app.use("/testAPI", testAPIRouter);
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index', {});
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map