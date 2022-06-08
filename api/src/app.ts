import express, { Application, Request, Response, NextFunction} from 'express';

const app: express.Application = express();
const port = 5000;
const whiteList = 'http://localhost:3000';
const corsOptions = {
  origin: "http://localhost:3000",
}
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
    console.log(`Example app listening on port ${port}`)
  })