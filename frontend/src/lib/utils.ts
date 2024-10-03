import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function convertToTimeZone(date: Date, timeZone: string): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const localeString = date.toLocaleString("id-ID", options);
  const [datePart, timePart] = localeString.split(", ");
  return formatDateString(datePart, timePart);
}

function formatDateString(datePart: string, timePart: string): string {
  const [day, month, year] = datePart.split("/");
  const formattedDate = `${year}-${month}-${day}`;
  return `${formattedDate} ${timePart.replace(/:/g, ":")}`;
}

export function toLocaleDateTime(
  date: Date | string,
  currency: string
): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided.");
  }

  switch (currency) {
    case "SGD":
      return convertToTimeZone(date, "Asia/Singapore");
    case "HKD":
      return convertToTimeZone(date, "Asia/Hong_Kong");
    case "USD":
      return convertToTimeZone(date, "America/New_York");
    case "AUD":
      return convertToTimeZone(date, "Australia/Sydney");
    case "EUR":
      return convertToTimeZone(date, "Europe/Berlin");
    case "JPY":
      return convertToTimeZone(date, "Asia/Tokyo");
    case "CAD":
      return convertToTimeZone(date, "America/Toronto");
    case "NZD":
      return convertToTimeZone(date, "Pacific/Auckland");
    case "CHF":
      return convertToTimeZone(date, "Europe/Zurich");
    default:
      return convertToTimeZone(date, "Asia/Jakarta");
  }
}