import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index";

dotenv.config();
const app = express();


const clientUrl = process.env.CLIENT_URL;
const corsOptions = {
  credentials: true,
  origin: clientUrl ? clientUrl.split(',') : [],
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/api", routes);

module.exports = app;
