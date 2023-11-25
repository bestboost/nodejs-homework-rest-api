import bcrypt from "bcrypt";
import User from "../models/User.js";
import { HttpError } from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("register  hashPassword:", hashPassword);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
  });
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw HttpError(401, "Email or password is wrong");
//   }
//   const passwordCompare = await bcrypt.compare(password, user.password);
//   if (!passwordCompare) {
//     throw HttpError(401, "Email or password is wrong");
//   }
// };

export default {
  register: ctrlWrapper(register),
  // login: ctrlWrapper(login),
};
