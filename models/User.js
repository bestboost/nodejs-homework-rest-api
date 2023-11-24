import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, preUpdate } from "./hooks.js";

const userSchema = new Schema(
  {
    //     owner: {
    //       type: Schema.Types.ObjectId,
    //       ref: "user",
    //     },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  // owner: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

export const userSigninSchema = Joi.object({
  // owner: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  //   subscription: Joi.string(),
});

const User = model("user", userSchema);

export default User;
