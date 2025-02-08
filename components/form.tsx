"use client";
import { Button } from "@/components/ui/button";
import dbConnect from "@/db/db";
import UserModel from "@/model/user";
import axios from "axios";
import { useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Form = () => {
  const fullNameRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const RegistrationDateRef = useRef(null);
  const InsurancValidUptoRef = useRef(null);
  const AmountRef = useRef(null);
  const VehicleModeRef = useRef(null);
  const FitnessValidUptoRef = useRef(null);
  const PUCCValidUptoRef = useRef(null);

  const handleClick = async () => {
    const fullNameValue = fullNameRef?.current.value;
    const mobileNumberValue = mobileNumberRef?.current.value;
    const RegistrationDateValue = RegistrationDateRef?.current.value;
    const InsurancValidUptoValue = InsurancValidUptoRef?.current.value;
    const FitnessValidUptoValue = FitnessValidUptoRef?.current.value;
    const PUCCValidUptValue = PUCCValidUptoRef?.current.value;
    const VehicleModeValue = VehicleModeRef?.current.value;

    const obj = {
      fullName: fullNameValue,
      customerMobileNo: mobileNumberValue,
      vehicleMode: VehicleModeValue,
      registrationDate: RegistrationDateValue,
      fitnessValidUpto: FitnessValidUptoValue,
      insurancValidUpto: InsurancValidUptoValue,
      PUCCValidUpto: PUCCValidUptValue,
    };
    await axios.post("/api/user", obj);
  };

  return (
    <div className="w-screen h-screen ">
      <h1>Create new customer</h1>
      <div className="flex flex-col border justify-between w-fit gap-2 m-2  ">
        <div className="flex justify-between ">
          <Label>Full Name </Label>
          <Input ref={fullNameRef} type="text" placeholder="Full name" />
        </div>
        <div className="flex">
          <Label>Mobile Number </Label>

          <Input
            ref={mobileNumberRef}
            type="number"
            placeholder="Enter mobile number"
          />
        </div>
        <div className="flex">
          <Label>Registration Date </Label>

          <Input
            ref={RegistrationDateRef}
            type="date"
            placeholder="Insurance Date"
          />
        </div>
        <div className="flex">
          <Label>Insuranc Valid Upto </Label>

          <Input
            ref={InsurancValidUptoRef}
            type="date"
            placeholder="Insurance Expiry Date"
          />
        </div>
        <div className="flex">
          <Label>Fitness Valid Upto </Label>

          <Input
            ref={FitnessValidUptoRef}
            type="date"
            placeholder="Fitness Valid Upto"
          />
        </div>
        <div className="flex">
          <Label>PUCC Valid Upto</Label>

          <Input
            ref={PUCCValidUptoRef}
            type="date"
            placeholder="PUCC Valid Upto"
          />
        </div>
        <div className="flex">
          <Label>Vehicle Mode</Label>

          <Input ref={VehicleModeRef} type="text" placeholder="Vehicle Mode" />
        </div>
      </div>
      <Button onClick={handleClick}>Create</Button>
    </div>
  );
};

export default Form;
