import express from "express";
import authController from "../../controllers/auth-controller.js";
import isEmptyBody from "../../middleweares/isEmptyBody.js";
import authenticate from "../../middleweares/authenticate.js";
import validateBody from "../../decorators/validaterBody.js";
import { userSignupSchema, userSigninSchema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.register
);

authRouter.post(
  "/users/login",
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.login
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
