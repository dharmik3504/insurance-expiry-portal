import { Portal } from "@/components/portal";

import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // const router = useRouter();
  const customer = await axios.get("http://localhost:3000/api/user");
  const { insuranceData } = customer.data;
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <Portal insuranceData={insuranceData} />{" "}
    </div>
  );
}
