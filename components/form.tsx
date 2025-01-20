"use client";
import { Button } from "@/components/ui/button";
import dbConnect from "@/db/db";
import UserModel from "@/model/user";
import axios from "axios";
import { useRef } from "react";

const Form = () => {
  const fullNameRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const InsuranceDateRef = useRef(null);
  const InsuranceExpiryDateRef = useRef(null);
  const AmountRef = useRef(null);
  const VehicleModeRef = useRef(null);
  const handleClick = async () => {
    const fullNameValue = fullNameRef?.current.value;
    const mobileNumberValue = mobileNumberRef?.current.value;
    const InsuranceDateValue = InsuranceDateRef?.current.value;
    const InsuranceExpiryDateValue = InsuranceExpiryDateRef?.current.value;
    const AmountValue = AmountRef?.current.value;
    const VehicleModeValue = VehicleModeRef?.current.value;

    const obj = {
      fullName: fullNameValue,
      mobileNumber: mobileNumberValue,
      InsuranceDate: InsuranceDateValue,
      InsuranceExpiryDate: InsuranceExpiryDateValue,
      Amount: AmountValue,
      VehicleMode: VehicleModeValue,
    };
    await axios.post("/api/user", obj);
    // await UserModel.create({
    //   fullName: fullNameValue,
    //   mobileNumber: mobileNumberValue,
    //   InsuranceDate: InsuranceDateValue,
    //   InsuranceExpiryDate: InsuranceExpiryDateValue,
    //   Amount: AmountValue,
    //   VehicleMode: VehicleModeValue,
    // });
  };

  return (
    <div>
      <h1>Create new customer</h1>
      <div>
        <input ref={fullNameRef} type="text" placeholder="Full name" />
        <input
          ref={mobileNumberRef}
          type="number"
          placeholder="Enter mobile number"
        />
        <input
          ref={InsuranceDateRef}
          type="date"
          placeholder="Insurance Date"
        />
        <input
          ref={InsuranceExpiryDateRef}
          type="date"
          placeholder="Insurance Expiry Date"
        />
        <input ref={AmountRef} type="number" placeholder="Amount" />
        <input ref={VehicleModeRef} type="text" placeholder="Vehicle Mode" />
        <Button onClick={handleClick}>Create</Button>
      </div>
    </div>
  );
};

export default Form;
