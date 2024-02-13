import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import Response from "./domain/response.js";
import log from "./logging/logger.js";
import { HttpStatus } from "./controller/patient.controller.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
//put cors above
app.use(express.json());

app.get("/", (req, res) => {
  res.json(new Response(HttpStatus.OK.code,HttpStatus.OK.status , "patients APT, v1.0.0 - All Systems OK"));
});

function getIPAddress() {
  const interfaces = require("os").networkInterfaces();
  let addresses = [];
  for (let k in interfaces) {
    if (!interfaces.hasOwnProperty(k)) continue;
    for (let i = 0; i < interfaces[k].length; i++) {
      let address = interfaces[k][i];
      if (address.family === "IPv4" && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  return addresses[0] ? addresses : false;
}

//console.log(process.env)

app.listen(PORT, () => {
  log.info(`Server is Running on ${ip.address()}:${PORT}`);
});
