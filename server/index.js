import express from "express";
import https from "https";
import cors from "cors";
import middlewareConfig from "./configs/middleware";
import requestIp from "request-ip";


import {
  ServicesRoutes
} from "./modules";

const PORT =  3000;

// db connection
//dbConnect();

// initiate express
const app = express();
app.use(cors());
// middleware
middlewareConfig(app);

// routes
app.set('trust proxy', 1);
app.use("/api",ServicesRoutes);


// render index page
app.get("/", function(req, res) {
  res.send("S*U*A*R*O");
});

app.all("*", function (req, res, next) {
   const clientIp = requestIp.getClientIp(req); 
   console.log('REQUEST IP',clientIp);
   next();
});


// start a server on port 3000
try {
  //https.createServer(app).listen(3000);
  app.listen(PORT, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`App listening to port: ${PORT}`);
    }
  });
} catch (err) {
  console.log("err", err);
}

