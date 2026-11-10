import express from "express";

const app = express();

import routeRiddles from "./routes/riddles.js";
import routePlayers from "./routes/players.js";

const PORT = 3000;

//making the server to parse the content to the 'req.body'
app.use(express.json());

//connecting the routes to the server so when there is a request it will lead it to the right route
app.use("/api/riddles", routeRiddles);
app.use("/api/players", routePlayers);

app.listen(PORT, () => {
  console.log(`Server is running on ${"http://localhost:3000"}`);
});
