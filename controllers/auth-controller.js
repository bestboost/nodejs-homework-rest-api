import User from "../models/User.js";
import { HttpError } from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const signup = async (req, res) => {
  const newUser = await User.create(req.bodu);

  res.status(201).json({
    user: {
      email: "example@example.com",
      subscription: "starter",
    },
  });
};

export default {
  signup: ctrlWrapper(signup),
};
