import mongoose, { model, models, Schema, Types } from "mongoose";

const UserSchema = new Schema({
  Name: { type: String, require: true },
  email: { type: String, require: true },
  photo: { type: String },
});
const ContentSchema = new Schema({
  fullName: { type: String, require: true },
  customerMobileNo: { type: Number, require: true },
  vehicleMode: { type: String, require: true },
  registrationDate: { type: Date, require: true },
  fitnessValidUpto: { type: Date, require: true },
  insurancValidUpto: { type: Date, require: true },
  PUCCValidUpto: { type: Date, require: true },
  userId: { type: Types.ObjectId, ref: "User", require: true },
  calendarId: { type: String, require: true },
  calendarHtmlLink: { type: String, require: true },
});

// UserModel
export const UserModel = models.User || model("User", UserSchema);

export const ContentModel = models.Content || model("Content", ContentSchema);
