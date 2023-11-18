import mongoose from "mongoose";
// TzsGIRF1cyfW9cRD
import app from "./app.js";

const { DB_CONTACTS, PORT } = process.env;

mongoose
  .connect(DB_CONTACTS)
  .then(() => {
    app.listen(PORT, () => console.log("Database connection successful"));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
