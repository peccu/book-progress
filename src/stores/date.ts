const zerofill = (s: number) => ("0" + s.toString()).slice(-2);

// round by day
const oneDayMs = 24 * 60 * 60 * 1000;
export const dateFloor = (d: Date) => {
  const offset = d.getTimezoneOffset();
  return new Date(
    Math.floor((d.getTime() + offset) / oneDayMs) * oneDayMs - offset
  );
};

export const format = (date: number) => {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = zerofill(d.getMonth() + 1);
  const day = zerofill(d.getDate());
  const h = zerofill(d.getHours());
  const min = zerofill(d.getMinutes());
  const s = zerofill(d.getSeconds());
  const ret = `${y}/${m}/${day} ${h}:${min}:${s}`;
  // console.log(ret);
  return ret;
};
