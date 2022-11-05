const zerofill = (s: number) => ("0" + s.toString()).slice(-2);

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
