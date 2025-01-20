import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  fullName: { type: String, require: true },
  customerMobileNo: { type: Number, require: true },
  insuranceDate: { type: Date, require: true },
  insurancExpiryDate: { type: Date, require: true },
  totalAmount: { type: Number, require: true },
  vehicleMode: { type: String, require: true },
});

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
