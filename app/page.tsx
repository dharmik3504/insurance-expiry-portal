import { Portal } from "@/components/portal";

import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const customer = await axios.get("http://localhost:3000/api/user");
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const { insuranceData } = customer.data;

  return (
    <div>
      <div>{JSON.stringify(session)}</div>
      <Portal insuranceData={insuranceData} />{" "}
    </div>
  );
}
