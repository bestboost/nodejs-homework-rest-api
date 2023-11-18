import mongoose from "mongoose";
// TzsGIRF1cyfW9cRD
import app from "./app.js";

const { DB_CONTACTS, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_CONTACTS)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
