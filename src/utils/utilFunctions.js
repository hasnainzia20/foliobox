export function formatMonthYear(value) {
  if (value === "") return "";

  console.log(typeof value);
  //   debugger;
  const [year, month] = value.split("-");
  const date = new Date(year, month - 1);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}
