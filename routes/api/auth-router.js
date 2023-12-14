import express from "express";
import authController from "../../controllers/auth-controller.js";
import { isEmptyBody, authenticate, upload } from "../../middlewares/index.js";
import validateBody from "../../decorators/validaterBody.js";
import {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.register
);

authRouter.get("/users/verify/:verificationToken", authController.verify);

authRouter.post(
  "/users/verify",
  isEmptyBody,
  validateBody(userEmailSchema),
  authController.resendVerify
);

authRouter.post(
  "/users/login",
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.login
);

authRouter.get("/users/current", authenticate, authController.getCurrent);

authRouter.post("/users/logout", authenticate, authController.logout);

authRouter.patch(
  "/users/avatars",
  upload.single("avatar"),
  authenticate,
  authController.avatar
);

export default authRouter;
