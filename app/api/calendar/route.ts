import { NextRequest, NextResponse } from "next/server";
import { formatDate } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import axios from "axios";

export async function POST(req: NextRequest, res: NextResponse) {
  let body = await req.json();

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
  const {
    fullName,
    customerMobileNo,
    vehicleMode,
    registrationDate,
    fitnessValidUpto,
    insurancValidUpto,
    PUCCValidUpto,
  } = body;

  let description = `Your ${vehicleMode} insurance for the Sedan (Policy No: 12345) is due for renewal on ${formatDate(
    new Date(insurancValidUpto)
  )}. The total renewal amount is 500 Please contact to Pratik Thakkar for  renew your insurance before the expiry date to avoid any penalties. For further assistance, contact support.Pratik Thakkar - 8623883504`;
  let sendMessage = `https://api.whatsapp.com/send?phone=8623883504&text=${encodeURIComponent(
    description
  )}`;
  const session = await getServerSession(authOptions);

  const obj = {
    summary: `${vehicleMode} Insurance Expiry for ${fullName}`,
    description: `${description} \n 
        <a href="${sendMessage}" style="display:inline-block; padding:10px 15px; background-color:#007BFF; color:white; text-decoration:none; border-radius:5px;">Send WhatsApp Message</a>`,
    start: {
      dateTime: convertDateTime(insurancValidUpto, 8, 30.7), //"2025-01-15T10:00:00-05:00",
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: convertDateTime(insurancValidUpto, 9, 30, 7),
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
  if (session && session.user?.googleAccessToken) {
    try {
      const addEvent = await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/calendarId/events?calendarId=primary",
        obj,
        {
          headers: {
            Authorization: `Bearer ${session.user?.googleAccessToken}`,
          },
        }
      );
      const { htmlLink, id } = addEvent.data;
      const updatedBody = {
        ...body,
        calendarId: id,
        calendarHtmlLink: htmlLink,
      };

      const res1 = await fetch("http://localhost:3000/api/user", {
        method: "put",
        body: JSON.stringify(updatedBody),
      });

      return NextResponse.json({
        htmlLink,
        id,
      });
    } catch (e) {
      return NextResponse.json(
        {
          error: e.message,
        },
        { status: 401 }
      );
    }
  }
}
