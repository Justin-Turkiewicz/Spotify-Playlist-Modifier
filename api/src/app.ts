import express, { Application, Request, Response, NextFunction} from 'express';

const app: express.Application = express();
const port = 5000
var cors = require("cors");
app.use(cors());
var testAPIRouter = require("./routes/testAPI");
app.use("/testAPI", testAPIRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })