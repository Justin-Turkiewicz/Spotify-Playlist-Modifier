"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
var cors = require("cors");
app.use(cors());
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