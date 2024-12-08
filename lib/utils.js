export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ConvertHummanDateTime(dateString) {
  const date = new Date(dateString);

  // Format: "31/08/2024 21:31"
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Sử dụng định dạng 24h
  }).format(date);

  return formattedDate;
}
