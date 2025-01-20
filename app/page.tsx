import { Portal } from "@/components/portal";
import dbConnect from "@/db/db";
import UserModel from "@/model/user";
import axios from "axios";
import { getServerSession } from "next-auth";

export default async function Home() {
  return (
    <div>
      <Portal />;
    </div>
  );
}
