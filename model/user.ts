import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  fullName: { type: String, require: true },
  mobileNumber: { type: Number, require: true },
  InsuranceDate: { type: Date, require: true },
  InsuranceExpiryDate: { type: Date, require: true },
  Amount: { type: Number, require: true },
  VehicleMode: { type: String, require: true },
});

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
