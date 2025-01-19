import { Portal } from "@/components/portal";
import axios from "axios";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  console.log(session);

  // const res = await axios.post(
  //   "https://www.googleapis.com/calendar/v3/calendars/calendarId/events?calendarId=primary",
  //   {
  //     headers: {
  //       Authorization: `Bearer ${session?.access_token}`,
  //     },
  //   }
  // );
  return (
    <div>
      <Portal />;
    </div>
  );
}
