import express, { Application, Request, Response, NextFunction} from 'express';

const app: express.Application = express();
const port = 5000
var cors = require("cors");
app.use(cors());
debugger;
var testAPIRouter = require("./routes/testAPI");
app.use("/testAPI", testAPIRouter);
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('index', {});
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })