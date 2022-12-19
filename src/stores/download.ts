// https://stackoverflow.com/a/18197341
const download = (filename: string, text: string) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`,
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
export default (text: string) => {
  const now = new Date();
  const datetime = now.getDate();
  download(`book-progress_${datetime}.json`, text);
};
