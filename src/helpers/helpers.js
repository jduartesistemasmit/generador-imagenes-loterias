const getFullDate = (format = "") => {
  const date = new Date().toLocaleDateString("es-VE", {
    timeZone: "America/Caracas",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const dateSplitted = date.split("/");
  const year = dateSplitted[2];
  const month = dateSplitted[1].padStart(2, "0");
  const day = dateSplitted[0].padStart(2, "0");

  if (format.toUpperCase() == "YYYYMMDD") return `${year}${month}${day}`;
  return `${day}${month}${year}`;
};

const getHour = (format) => {
  const hour12 = format == "24" ? false : true;
  const date = new Date().toLocaleString("es-VE", {
    timeZone: "America/Caracas",
    hour: "numeric",
    minute: "numeric",
    hour12,
  });
  return date;
};

const range = (n, a, b) => {
  return n >= a && n <= b;
};

/**
 * Get Venezuela Date formatted and splitted
 * @return Array[day,month]
 */
const getFormatDate = () => {
  return new Date()
    .toLocaleDateString("es-VE", {
      timeZone: "America/Caracas",
      day: "numeric",
      month: "short",
    })
    .toUpperCase()
    .split(" ");
};

module.exports = { getFullDate, getHour, range, getFormatDate };
