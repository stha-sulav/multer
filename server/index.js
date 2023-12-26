import dotenv from "dotenv";
import { connectDb } from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

connectDb()
  .then(
    app.listen(PORT, () => {
      console.log(`Server listening to ${PORT}`);
    })
  )
  .catch((err) => {
    console.log("Could not connect to Database", err.message);
  });
