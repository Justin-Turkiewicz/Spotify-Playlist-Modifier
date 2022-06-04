import express, { Application, Request, Response, NextFunction} from 'express';

const app: express.Application = express();
const port = 3000

var testAPIRouter = require("./routes/testAPI");
app.use("/testAPI", testAPIRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })