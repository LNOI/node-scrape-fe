export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ConvertHummanDateTime(dateString) {
  const date = new Date(dateString);

  // Format the date to a more readable format (e.g., "August 31, 2024, 9:31 PM")
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use 12-hour time format
  }).format(date);
  return formattedDate;
}
