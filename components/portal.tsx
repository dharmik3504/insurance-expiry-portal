"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

import { getSession, useSession } from "next-auth/react";

import { useEffect, useState } from "react";
interface insurance {
  _id: string;
  fullName: string;
  customerMobileNo: string;
  vehicleMode: string;
  registrationDate: string;
  fitnessValidUpto: string;
  insurancValidUpto: string;
  PUCCValidUpto: string;
  calendarHtmlLink: string;
}

// const getData=async ()=>{}
export const Portal = (session: any) => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [insuranceData, setInsuranceData] = useState([]);

  useEffect(() => {
    const customer = axios
      .get(`/api/user?uid=${session.session.user.uid}`)
      .then((data) => {
        setInsuranceData(data.data.insuranceData);
      });
  }, []);
  const hanldeAddClick = () => {
    router.push("/add");
  };
  const clickHandler = async (data: insurance) => {
    try {
      const result = await axios.post("/api/calendar", data);
    } catch (e) {}
  };

  return (
    <div>
      <div className="flex justify-center items-center text-4xl">
        Insurance Expiry Portal
      </div>
      <div className="flex justify-end items-end m-2">
        <Button variant={"destructive"} onClick={hanldeAddClick}>
          Add User
        </Button>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="">Full Name</TableHead>
            <TableHead>Mobile Number</TableHead>

            <TableHead>Registration Date</TableHead>
            <TableHead>Insurance Valid Upto</TableHead>
            <TableHead>Fitness Valid Upto</TableHead>
            <TableHead>PUCC Valid Upto</TableHead>
            <TableHead>Vehicle Mode</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {insuranceData &&
            insuranceData.map((invoice: insurance) => (
              <TableRow key={invoice._id}>
                <TableCell className="font-medium">
                  {invoice.fullName}
                </TableCell>
                <TableCell>{invoice.customerMobileNo}</TableCell>

                <TableCell>
                  {invoice.registrationDate
                    ? formatDate(new Date(invoice.registrationDate))
                    : ""}
                </TableCell>
                <TableCell>
                  {invoice.insurancValidUpto
                    ? formatDate(new Date(invoice.insurancValidUpto))
                    : ""}
                </TableCell>
                <TableCell>
                  {invoice.fitnessValidUpto
                    ? formatDate(new Date(invoice.fitnessValidUpto))
                    : ""}
                </TableCell>
                <TableCell>
                  {invoice.PUCCValidUpto
                    ? formatDate(new Date(invoice.PUCCValidUpto))
                    : ""}
                </TableCell>
                <TableCell>{invoice.vehicleMode}</TableCell>

                <TableCell>
                  <Button
                    onClick={() => {
                      console.log("coming soon..");
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>

                <TableCell>
                  {invoice.calendarHtmlLink ? (
                    <Button
                      onClick={() => {
                        router.push(invoice.calendarHtmlLink);
                      }}
                    >
                      View
                    </Button>
                  ) : (
                    <Button onClick={() => clickHandler(invoice)}>
                      Add Event
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
