import express from "express";
import logger from "morgan";
import cors from "cors";

import contactsRouter from "./routes/api/contacts.js";

const app = express();
console.log("Hi");
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// підключення проміжного ПЗ
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

//обробка статичних ресурсів
// app.use(express.static(path.join(__dirname, "public")));

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(500).json({ message: err.message });
});

export default app;
