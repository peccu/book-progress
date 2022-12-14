// round by day
const oneDayMs = 24 * 60 * 60 * 1000;
export const dateFloor = (d: Date) => {
  const offset = d.getTimezoneOffset() * 60 * 1000;
  return new Date(
    Math.floor((d.getTime() - offset) / oneDayMs) * oneDayMs + offset,
  );
};
