import { Schema, model, models } from "mongoose";
import isEmail from "validator/lib/isEmail";

// const sample = {
//   id: 4,
//   username: "nihal",
//   name: "Asif Nihal",
//   ? 2 sizes for avatar img {96} or {288}
//   avatar_template: "/letter_avatar_proxy/v4/letter/n/8797f3/{size}.png",
//   active: true,
//   admin: true,
//   moderator: false,
//   last_seen_at: "2023-11-29T04:37:07.152Z",
//   last_emailed_at: "2023-12-04T15:08:35.764Z",
//   created_at: "2023-11-29T04:08:08.374Z",
//   last_seen_age: 482929.503786278,
//   last_emailed_age: 13040.891573541,
//   created_at_age: 484668.281748745,
//   trust_level: 1,
//   manual_locked_trust_level: null,
//   title: null,
//   time_read: 0,
//   staged: false,
//   days_visited: 1,
//   posts_read_count: 0,
//   topics_entered: 0,
//   post_count: 0,
// };

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
  avatar: {
    type: String,
  },
  name: {
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
    minLength: [8, "Password must be at least 8 characters long!"],
    select: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
