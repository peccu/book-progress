const zerofill = (s: number) => ("0" + s.toString()).slice(-2);

export default (date: number) => {
  const d = new Date(date);
  const y = d.getUTCFullYear();
  const m = zerofill(d.getUTCMonth() + 1);
  const day = zerofill(d.getUTCDay());
  const h = zerofill(d.getHours());
  const min = zerofill(d.getMinutes());
  const s = zerofill(d.getSeconds());
  const ret = `${y}/${m}/${day} ${h}:${min}:${s}`;
  // console.log(ret);
  return ret;
};
