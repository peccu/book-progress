import type { Book, Progress } from "@/stores/books";
type HistoryPoint = { date: Date; val: number; bin: number };
type Histories = { key: string; d: HistoryPoint[] };

export type Series = { name: string; values: number[] };
export type DateNSeries = { dates: Date[]; series: Series[] };

type Row = { name: string; date: Date; value: number };

// round by day
const oneDayMs = 24 * 60 * 60 * 1000;
const dateFloor = (d: Date) => {
  const offset = d.getTimezoneOffset();
  return new Date(
    Math.floor((d.getTime() + offset) / oneDayMs) * oneDayMs - offset
  );
};

// the progress by page on the history
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

// progress by day
const makeLine = (b: Book) => {
  return b.history.reduce((a: { [key: string]: number }, h) => {
    const day = dateFloor(new Date(h.date));
    const key = `${day.getTime()}`;
    const c = current(b, h);
    a[key] = Math.max(a[key] || 0, c);
    return a;
  }, {});
};

export default {
  data: (books: Book[]): Histories[] => {
    console.log(`book count is ${books.length}`);
    const lines: Histories[] = books.map((b) => {
      // console.log('b', b.pages)
      // console.log('b title', b.title)
      // console.log('history', b.history)
      // console.log('history len', b.history.length)
      const line = makeLine(b);
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
  data3: (d3: any, books: Book[]): DateNSeries => {
    const data = books.reduce((rows: Row[], book) => {
      const line = makeLine(book);
      const _dates: Date[] = Array.from(
        d3
          .group(book.history, (d: Progress) => dateFloor(new Date(d.date)))
          .keys()
      ).sort(d3.ascending) as Date[];
      const values = _dates.map((date, i, a) => {
        // console.log([date, i, a]);
        if (i == 0) {
          return line[`${date.getTime()}`]; // 過去に読んでたものを登録すると一気に進捗出たことになってしまうので要検討
        }
        const prev = a[i - 1];
        return line[`${date.getTime()}`] - line[`${prev.getTime()}`];
      });
      console.log("values", [
        book.title,
        book.history.map((e) => current(book, e)),
        values,
      ]);
      return rows.concat(
        book.history.map((hs: Progress, i: number) => {
          return {
            name: book.title,
            date: dateFloor(new Date(hs.date)),
            value: values[i],
          };
        })
      );
    }, []);
    console.log("data", data);

    const dates = Array.from(d3.group(data, (d: Row) => d.date).keys()).sort(
      d3.ascending
    ) as Date[];
    console.log("dates", dates);
    const result = {
      dates: dates.map((d) => new Date(d)),
      series: d3
        .groups(data, (d: Row) => d.name)
        .map((g: [name: string, values: Row[]]) => {
          console.log("g", g);
          const value = new Map<Date, number>(
            g[1].map((d: Row) => [d.date, d.value])
          );
          return { name: g[0], values: dates.map((d) => value.get(d) || 0) };
        }),
    };
    console.log("result", result);
    return result;
  },
  data2: (d3: any, books: Book[]): DateNSeries => {
    // https://stackoverflow.com/a/35853493
    const histories = books.reduce((hs: Progress[], book) => {
      return hs.concat(book.history);
    }, []);
    const dates: Date[] = Array.from(
      d3.group(histories, (d: Progress) => dateFloor(new Date(d.date))).keys()
    ).sort(d3.ascending) as Date[];

    return {
      dates,
      series: books.map((book) => {
        const line = makeLine(book);
        return {
          name: book.title,
          values: dates.map((date, i, a) => {
            // console.log([date, i, a]);
            if (line[`${date.getTime()}`]) {
              return line[`${date.getTime()}`];
            }
            if (i == 0) {
              return 0;
            }
            const prev = a[i - 1];
            return line[`${prev.getTime()}`];
          }),
        };
      }),
    } as DateNSeries;
  },
};
