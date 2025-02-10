import { Portal } from "@/components/portal";

import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { debugData } from "@/lib/utils";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  debugData("session from main page", session);
  return (
    <div>
      <Portal session={session} />
    </div>
  );
}
