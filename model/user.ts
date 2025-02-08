import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  fullName: { type: String, require: true },
  customerMobileNo: { type: Number, require: true },
  vehicleMode: { type: String, require: true },
  registrationDate: { type: Date, require: true },
  fitnessValidUpto: { type: Date, require: true },
  insurancValidUpto: { type: Date, require: true },
  PUCCValidUpto: { type: Date, require: true },
});

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
