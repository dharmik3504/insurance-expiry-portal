import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if necessary
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-based) and pad
  const year = date.getFullYear(); // Get full year

  return `${day}-${month}-${year}`;
}
// export function debugData(logName: string, data: any) {
//   console.log(`---------start ${logName}----------------------`);
//   console.log(data);
//   console.log(`-----------end ${logName}--------------------`);
// }
