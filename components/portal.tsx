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
import axios from "axios";

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
export const Portal = () => {
  const [users, setUsers] = useState([]);
  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-based) and pad
    const year = date.getFullYear(); // Get full year

    return `${day}-${month}-${year}`;
  }
  useEffect(() => {
    axios.get("/api/user").then((x) => {
      setUsers(x.data.insuranceData);
      console.log(x.data.insuranceData);
    });
  }, []);
  const clickHandler = async (data: insurance) => {
    const res = getSession().then((x) => {
      axios
        .post(
          "https://www.googleapis.com/calendar/v3/calendars/calendarId/events?calendarId=primary",
          {
            summary: "Doctor's Appointment",
            description: "Visit Dr. Smith for a regular check-up.",
            start: {
              dateTime: "2025-01-15T10:00:00-05:00",
              timeZone: "America/New_York",
            },
            end: {
              dateTime: "2025-01-15T11:00:00-05:00",
              timeZone: "America/New_York",
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
          },
          {
            headers: {
              Authorization: `Bearer ${x?.user.googleAccessToken}`,
            },
          }
        )
        .then((res) => {
          if (res.status) {
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
          {users.map((invoice: insurance) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">{invoice.fullName}</TableCell>
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
                <Button onClick={() => clickHandler(invoice)}>Add Event</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
