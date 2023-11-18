import mongoose from "mongoose";
// TzsGIRF1cyfW9cRD
import app from "./app.js";

// const { DB_CONTACTS, PORT = 3000 } = process.env;
const DB_CONTACTS =
  "mongodb+srv://Darya:TzsGIRF1cyfW9cRD@cluster0.llnpj3k.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_CONTACTS)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
