import http from "http";

import app from "./app";

//helpers and config
import setConfig from "config/config";
import connectMongo from "db/db";

setConfig();

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3007;

httpServer.listen(PORT, async () => {
  try {
    await connectMongo();
    console.log("@@@ mongodb connected ***");
  } catch (error) {
    console.log(`$$$ mongodb connection failled! =>>${error.message}`);
  } finally {
    console.log(`@@@@@  server is running on http://localhost:${PORT} ..`);
  }
});
