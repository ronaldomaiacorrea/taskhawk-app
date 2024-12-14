import { format } from "date-fns";

/**
 * Formats a UTC date into "weekday, MM/DD/YY, hh:mm AM/PM" in the user's local timezone.
 *
 * @param utcDate - The UTC date string to format.
 * @returns The formatted date string.
 */
export const dateTemplate = (date: Date) => {
  const formattedDate = format(date, "EEEE, MM/dd/yy");
  const formattedTime = format(date, "hh:mm a");

  return `${formattedDate}, ${formattedTime}`;
};
