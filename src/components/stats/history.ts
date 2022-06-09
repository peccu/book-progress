import type { Book, Progress } from "@/stores/books";
type HistoryPoint = { date: Date; val: number; bin: number };
type Histories = { key: string; d: HistoryPoint[] };
const oneDayMs = 24 * 60 * 60 * 1000;
const dateFloor = (d: Date) => {
  const offset = d.getTimezoneOffset();
  return new Date(
    Math.floor((d.getTime() - offset) / oneDayMs) * oneDayMs + offset
  );
};

const current = (book: Book, history: Progress) => {
  if (book.pages > 0) {
    return history.type == "%"
      ? (book.pages * history.progress) / 100
      : history.progress;
  }
  if (history.type == "page") {
    console.warn("book dont have pages but history has page progress", [
      book,
      history,
    ]);
  }
  return history.progress;
};

export default {
  data: (books: Book[]): Histories[] => {
    console.log(`book count is ${books.length}`);
    const lines: Histories[] = books.map((b) => {
      // console.log('b', b.pages)
      // console.log('b title', b.title)
      // console.log('history', b.history)
      // console.log('history len', b.history.length)
      const line = b.history.reduce((a: { [key: string]: number }, h, i) => {
        // console.log([a, h, i]);
        // console.log('h', h);
        // console.log('h date', h.date);
        // console.log('h pg', h.progress);
        const day = dateFloor(new Date(h.date));
        const key = `${day.getTime()}`;
        // console.log('history: ' + new Date(h.date) + ' floor: ' + day);
        const c = current(b, h);
        a[key] = Math.max(a[key] || 0, c);
        return a;
      }, {});
      const days = Object.keys(line);
      // console.log('keys', days);
      const bin = (i: number) =>
        line[days[i]] - (i > 0 ? line[days[i - 1]] : 0);
      const d = days.map((e, i) => {
        // console.log('e, i', [e, i]);
        return {
          date: new Date(e),
          val: line[e],
          bin: bin(i),
        } as HistoryPoint;
      });
      return {
        key: b.title,
        d: d,
      } as Histories;
    });
    console.log("lines", lines);
    return lines;
  },
};
