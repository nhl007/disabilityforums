import { Schema, model, models } from "mongoose";
import isEmail from "validator/lib/isEmail";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
    validate: [isEmail, "Please enter a valid email address"],
  },
  discourseId: {
    type: Number,
  },
  progress: {
    type: Number,
    default: 1,
  },
  avatar: {
    type: String,
  },

  username: {
    type: String,
    unique: [true, "Username already exists!"],
    required: [true, "Please enter your username!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);

export default User;

//   ? 2 sizes for avatar img {96} or {288}
