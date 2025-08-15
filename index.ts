import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index";

dotenv.config();
const app = express();

app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use("/api", routes);

module.exports = app;
