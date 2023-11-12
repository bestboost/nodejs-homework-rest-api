import express from "express";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
// TzsGIRF1cyfW9cRD

import contactsRouter from "./routes/api/contacts.js";

const DB_CONTACTS =
  "mongodb+srv://Darya:TzsGIRF1cyfW9cRD@cluster0.llnpj3k.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_CONTACTS)
  .then(() => console.log("Database connect success"))
  .catch((error) => console.log(error.message));

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
