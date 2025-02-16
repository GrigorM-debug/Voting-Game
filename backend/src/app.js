import express from "express";
import expressConfig from "../config/express.js";
import mongoDbConfig from "../config/mongodb.js";
import routes from "../config/routes.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

async function start() {
  expressConfig(app);
  routes(app);
  await mongoDbConfig();

  app.listen(port, () => console.log(`Server listening on port: ${port}`));
}

await start();
