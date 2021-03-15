import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import validator from "express-validator";
var body = require('body-parser')

export default app => {
  app.use(body());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan("dev"));
  app.use(validator());
  app.use(cors());
};
