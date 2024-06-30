export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(date));
};

export const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(date));
};