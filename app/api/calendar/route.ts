import { NextRequest, NextResponse } from "next/server";
import { formatDate } from "@/lib/utils";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const convertDateTime = (
    date: string,
    hours: number = 0,
    min: number = 0,
    eventRemainderBeforeDay: number = 7
  ) => {
    const date1 = new Date(date);

    date1.setDate(date1.getDate() - eventRemainderBeforeDay);

    date1.setHours(date1.getHours() + hours); // Adds 2 hours
    date1.setMinutes(date1.getMinutes() + min); // Adds 30 minutes

    // Convert to ISO string
    const updatedDate = date1.toISOString();
    return updatedDate;
  };
  const {
    fullName,

    vehicleMode,

    insurancValidUpto,
  } = body;

  const description = `Your ${vehicleMode} insurance for the Sedan (Policy No: 12345) is due for renewal on ${formatDate(
    new Date(insurancValidUpto)
  )}. The total renewal amount is 500 Please contact to Pratik Thakkar for  renew your insurance before the expiry date to avoid any penalties. For further assistance, contact support.Pratik Thakkar - 8623883504`;
  const sendWhatappMessage = `https://api.whatsapp.com/send?phone=8623883504&text=${encodeURIComponent(
    description
  )}`;
  const sendSimpleSMS = `sms:8623883504?body=${encodeURIComponent(
    description
  )}`;
  const session = await getServerSession(authOptions);

  const obj = {
    summary: `${vehicleMode} Insurance Expiry for ${fullName}`,
    description: `${description} \n 
        <a href="${sendWhatappMessage}" style="display:inline-block; padding:10px 15px; background-color:#007BFF; color:white; text-decoration:none; border-radius:5px;">Send WhatsApp Message</a> \n 
        <a href="${sendSimpleSMS}" style="display:inline-block; padding:10px 15px; background-color:#007BFF; color:white; text-decoration:none; border-radius:5px;">Send Simple SMS</a>
        `,
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
  //@ts-expect-error  des  des
  if (session && session.accessToken) {
    try {
      const addEvent = await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/calendarId/events?calendarId=primary",
        obj,
        {
          headers: {
            //@ts-expect-error  des
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const { htmlLink, id } = addEvent.data;
      const updatedBody = {
        ...body,
        calendarId: id,
        calendarHtmlLink: htmlLink,
      };

      await fetch(`${process.env.BASE_URL}/api/user`, {
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
          //@ts-expect-error  des
          error: e.message,
        },
        { status: 401 }
      );
    }
  } else {
    return NextResponse.json({
      message: "session is missing",
    });
  }
}
