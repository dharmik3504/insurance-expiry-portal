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
interface insurance {
  id: number;
  fullName: string;
  insuranceDate: string;
  insurancExpiryDate: string;
  totalAmount: string;
  vehicleMode: string;
  customerMobileNo: number;
  paymentMethod: string;
}
const insuranceData: insurance[] = [
  {
    id: 1,
    fullName: "John Doe",
    insuranceDate: "2025-01-01",
    insurancExpiryDate: "2026-01-01",
    totalAmount: "500",
    vehicleMode: "Car",
    customerMobileNo: 8623883504,
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    insuranceDate: "2024-12-15",
    insurancExpiryDate: "2025-12-15",
    totalAmount: "300",
    vehicleMode: "Motorcycle",
    customerMobileNo: 8623883504,
    paymentMethod: "Debit Card",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    insuranceDate: "2024-11-20",
    insurancExpiryDate: "2025-11-20",
    totalAmount: "700",
    vehicleMode: "Truck",
    customerMobileNo: 8623883504,
    paymentMethod: "Cash",
  },
  {
    id: 4,
    fullName: "Bob Brown",
    insuranceDate: "2024-10-10",
    insurancExpiryDate: "2025-10-10",
    totalAmount: "450",
    customerMobileNo: 8623883504,
    vehicleMode: "SUV",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 5,
    fullName: "Emma Davis",
    insuranceDate: "2024-09-05",
    insurancExpiryDate: "2025-09-05",
    totalAmount: "350",
    customerMobileNo: 8623883504,
    vehicleMode: "Van",
    paymentMethod: "UPI",
  },
  {
    id: 6,
    fullName: "Michael Wilson",
    insuranceDate: "2025-01-12",
    insurancExpiryDate: "2026-01-12",
    totalAmount: "600",
    vehicleMode: "Car",
    customerMobileNo: 8623883504,
    paymentMethod: "Credit Card",
  },
];
export const Portal = () => {
  const clickHandler = (data: insurance) => {
    console.log(data);
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
          {insuranceData.map((invoice: insurance) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.fullName}</TableCell>
              <TableCell>{invoice.customerMobileNo}</TableCell>

              <TableCell>{invoice.insuranceDate}</TableCell>
              <TableCell>{invoice.insurancExpiryDate}</TableCell>
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
