// sendgrid - m7W.vKK3/#sv#3Q6

import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/api/auth-router.js";
import contactsRouter from "./routes/api/contacts-router.js";

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

////////////////////////
import sgMail from "@sendgrid/mail";
const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
const msg = {
  to: "nahelo2910@lanxi8.com", // Change to your recipient
  from: SENDGRID_EMAIL_FROM, // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });

///////////////////////////

app.use("/", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
