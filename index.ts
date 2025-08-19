import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index";

dotenv.config();
const app = express();

const clientUrl = process.env.CLIENT_URL;
const PORT = process.env.PORT || 13200;

const corsOptions = {
  credentials: true,
  origin: clientUrl ? clientUrl.split(",") : ["http://localhost:3000"],
};
app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
