import mongoose, { Schema, Types } from "mongoose";

export interface UserSchemaProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profilePhoto: string;
  expireToken: string;
}

const userSchema = new Schema<UserSchemaProps>(
  {
    firstname: {
      type: String,
      required: [true, "Please add a firstname"],
    },
    lastname: {
      type: String,
      required: [true, "Please add a lastname"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    profilePhoto: {
      type: String,
    },
    expireToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserAuth = mongoose.model("UserAuth", userSchema);

export default UserAuth;
