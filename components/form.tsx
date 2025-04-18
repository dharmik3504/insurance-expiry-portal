"use client";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface insuranceData {
  _id: string;
  fullName: string;
  customerMobileNo: number;
  vehicleMode: string;
  registrationDate: string;
  fitnessValidUpto: string;
  insurancValidUpto: string;
  PUCCValidUpto: string;
  userId: string;
  calendarHtmlLink: string;
  calendarId: string;
}
const Form = ({ formData }: { formData?: insuranceData }) => {
  const { toast } = useToast();
  const router = useRouter();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const mobileNumberRef = useRef<HTMLInputElement>(null);
  const RegistrationDateRef = useRef<HTMLInputElement>(null);
  const InsurancValidUptoRef = useRef<HTMLInputElement>(null);
  // const AmountRef = useRef(null);
  const VehicleModeRef = useRef<HTMLInputElement>(null);
  const FitnessValidUptoRef = useRef<HTMLInputElement>(null);
  const PUCCValidUptoRef = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    const fullNameValue = fullNameRef.current?.value || "";

    const mobileNumberValue = mobileNumberRef.current?.value || "";

    const RegistrationDateValue = RegistrationDateRef.current?.value || "";

    const InsurancValidUptoValue = InsurancValidUptoRef.current?.value || "";

    const FitnessValidUptoValue = FitnessValidUptoRef.current?.value || "";

    const PUCCValidUptValue = PUCCValidUptoRef.current?.value || "";

    const VehicleModeValue = VehicleModeRef.current?.value || "";

    const obj = {
      fullName: fullNameValue,
      customerMobileNo: mobileNumberValue,
      vehicleMode: VehicleModeValue,
      registrationDate: RegistrationDateValue,
      fitnessValidUpto: FitnessValidUptoValue,
      insurancValidUpto: InsurancValidUptoValue,
      PUCCValidUpto: PUCCValidUptValue,
    };

    try {
      const res = await axios.post("/api/user", obj);
      toast({
        title: "Success",
        description: "Customer created successfully!",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    if (formData) {
      console.log("formData : " + formData.fullName);
      updatedForm(formData);
    }
  }, [formData]);
  const updatedForm = (formData: insuranceData) => {
    if (formData) {
      fullNameRef.current.value = formData.fullName;
      //@ts-expect-error  des

      const mobileNumberValue = mobileNumberRef?.current.value;
      //@ts-expect-error  des

      const RegistrationDateValue = RegistrationDateRef?.current.value;
      //@ts-expect-error  des

      const InsurancValidUptoValue = InsurancValidUptoRef?.current.value;
      //@ts-expect-error  des

      const FitnessValidUptoValue = FitnessValidUptoRef?.current.value;
      //@ts-expect-error  des

      const PUCCValidUptValue = PUCCValidUptoRef?.current.value;
      //@ts-expect-error  des

      const VehicleModeValue = VehicleModeRef?.current.value;
    }
  };
  return (
    <div className="w-screen h-screen ">
      {JSON.stringify(formData)}
      <h1 className="flex items-center justify-center font-bold">
        Create new customer
      </h1>
      <div className="flex-col items-center">
        <div className="flex m-2 items-center justify-center">
          <div>
            <Label className="m-6">Full Name </Label>
          </div>
          <div>
            <Input
              className="w-80"
              ref={fullNameRef}
              type="text"
              placeholder="Full name"
            />
          </div>
        </div>
        <div className="flex m-2 items-center justify-center">
          <Label className="m-2">Mobile Number </Label>

          <Input
            ref={mobileNumberRef}
            type="number"
            className="w-80"
            placeholder="Enter mobile number"
          />
        </div>
        <div className="flex m-2 items-center justify-center">
          <Label className="m-1">Registration Date </Label>

          <Input
            ref={RegistrationDateRef}
            className="w-80"
            type="date"
            placeholder="Insurance Date"
          />
        </div>

        <div className="flex m-2 items-center justify-center">
          <Label className="m-1">Insurance Valid Upto </Label>

          <Input
            ref={InsurancValidUptoRef}
            type="date"
            className="w-80"
            placeholder="Insurance Expiry Date"
          />
        </div>
        <div className="flex m-2 items-center justify-center">
          <Label className="m-1">Fitness Valid Upto </Label>

          <Input
            ref={FitnessValidUptoRef}
            type="date"
            className="w-80"
            placeholder="Fitness Valid Upto"
          />
        </div>
        <div className="flex m-2 items-center justify-center">
          <Label className="m-2">PUCC Valid Upto</Label>

          <Input
            ref={PUCCValidUptoRef}
            type="date"
            className="w-80"
            placeholder="PUCC Valid Upto"
          />
        </div>
        <div className="flex m-2 items-center justify-center">
          <Label className="m-4">Vehicle Mode</Label>

          <Input
            ref={VehicleModeRef}
            className="w-80"
            type="text"
            placeholder="Vehicle Mode"
          />
        </div>
      </div>
      <div className="flex justify-center items-center m-3">
        <Button onClick={handleClick}>Create</Button>
      </div>
    </div>
  );
};

export default Form;
