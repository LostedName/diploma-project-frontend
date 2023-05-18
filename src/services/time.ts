export const getDateTimeFromString = (badDateTime: string) => {
  const date = badDateTime.split("T")[0].split("-").reverse().join(".");
  const time = badDateTime.split("T")[1].split(".")[0];
  return `${date} ${time}`;
}