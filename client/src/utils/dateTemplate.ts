/**
 * Formats a given date into a string with the format "weekday, MM/DD/YY, hh:mm AM/PM".
 *
 * @param date - The date to be formatted.
 * @returns A string representing the formatted date and time.
 */
export const dateTemplate = (date: Date) => {
	const dateOptions: Intl.DateTimeFormatOptions = {
		month: '2-digit',
		day: '2-digit',
		year: '2-digit',
		weekday: 'long',
	};
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	};
	const formattedDate = date.toLocaleDateString(undefined, dateOptions);
	const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

	return `${formattedDate}, ${formattedTime}`;
};
