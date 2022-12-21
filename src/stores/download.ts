// https://stackoverflow.com/a/18197341
const download = (filename: string, type: string, text: string) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    `data:${type};charset=utf-8,${encodeURIComponent(text)}`
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
const zerofill = (num: number): string => ("0" + num.toString()).slice(-2);
const now = () => {
  const d = new Date();
  const date = `${d.getFullYear()}${d.getUTCMonth() + 1}${d.getUTCDate()}`;
  const time = `${zerofill(d.getHours())}${zerofill(d.getMinutes())}${zerofill(
    d.getSeconds()
  )}`;
  return `${date}_${time}`;
};
export default (text: string) => {
  download(`book-progress_${now()}.json`, "application/json", text);
};
