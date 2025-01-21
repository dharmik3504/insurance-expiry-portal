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

import { getSession } from "next-auth/react";

import { useEffect, useState } from "react";
interface insurance {
  _id: string;
  fullName: string;
  insuranceDate: string;
  insurancExpiryDate: string;
  totalAmount: string;
  vehicleMode: string;
  customerMobileNo: number;
  paymentMethod: string;
}

// const getData=async ()=>{}
export const Portal = ({ insuranceData }: { insuranceData: insurance[] }) => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const convertDateTime = (
    date: string,
    hours: number = 0,
    min: number = 0,
    eventRemainderBeforeDay: number = 7
  ) => {
    let date1 = new Date(date);

    date1.setDate(date1.getDate() - eventRemainderBeforeDay);

    date1.setHours(date1.getHours() + hours); // Adds 2 hours
    date1.setMinutes(date1.getMinutes() + min); // Adds 30 minutes

    // Convert to ISO string
    let updatedDate = date1.toISOString();
    return updatedDate;
  };

  const hanldeAddClick = () => {
    router.push("/add");
  };
  const clickHandler = async (data: insurance) => {
    const {
      fullName,
      insuranceDate,
      insurancExpiryDate,
      totalAmount,
      vehicleMode,
      customerMobileNo,
    } = data;
    const obj = {
      summary: `${vehicleMode} Insurance Expiry for ${fullName}`,
      description: `Your ${vehicleMode} insurance for the Sedan (Policy No: 12345) is due for renewal on ${formatDate(
        new Date(insurancExpiryDate)
      )}. The total renewal amount is 500 Please contact to Pratik Thakkar for  renew your insurance before the expiry date to avoid any penalties. For further assistance, contact support.Pratik Thakkar - 8623883504`,
      start: {
        dateTime: convertDateTime(insurancExpiryDate, 8, 30.7), //"2025-01-15T10:00:00-05:00",
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: convertDateTime(insurancExpiryDate, 9, 30, 7),
        timeZone: "Asia/Kolkata",
      },
      reminders: {
        useDefault: false,
        overrides: [
          {
            method: "email",
            minutes: 1440,
          },
          {
            method: "popup",
            minutes: 10,
          },
        ],
      },
    };
    const res = getSession().then((x) => {
      axios
        .post(
          "https://www.googleapis.com/calendar/v3/calendars/calendarId/events?calendarId=primary",
          obj,
          {
            headers: {
              Authorization: `Bearer ${x?.user.googleAccessToken}`,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            alert("added to Calender");
          }
        });
    });
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

            <TableHead>Insurance Date</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Vehicle Mode</TableHead>
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
                  {invoice.insuranceDate
                    ? formatDate(new Date(invoice.insuranceDate))
                    : ""}
                </TableCell>
                <TableCell>
                  {invoice.insurancExpiryDate
                    ? formatDate(new Date(invoice.insurancExpiryDate))
                    : ""}
                </TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
                <TableCell>{invoice.vehicleMode}</TableCell>
                <TableCell>
                  <Button onClick={() => clickHandler(invoice)}>
                    Add Event
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
