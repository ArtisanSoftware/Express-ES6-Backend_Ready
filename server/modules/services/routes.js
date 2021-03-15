
import { Router } from "express";
import * as ServicesController from "./controller";
import {errorHandler400 } from "../../utils";


export const ServicesRoutes = new Router();

ServicesRoutes.post("/testpay",ServicesController.testpayment);

ServicesRoutes.get("/paypaltest", function(req, res) {
  res.sendFile('./paypal.html' , { root : __dirname});
});

ServicesRoutes.post("/paypaltestauth",ServicesController.paypaltestauth);

ServicesRoutes.post("/testpayintent",ServicesController.paypaltest);

