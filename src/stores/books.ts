import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export interface Progress {
  type: string;
  progress: number;
  date: number;
  isFinished: boolean;
}

export interface Book {
  isbn: number;
  title: string;
  authors: string[];
  id: number;
  publisher: string;
  pages: number;
  progress: Progress;
  history: Progress[];
  isFinished: boolean;
  cover?: string;
  notes?: string;
}
// interface Filter {'all' | 'finished' | 'unfinished'}

export const validateIsbn = (code: string) => {
  // multiply by 3 for even numbers and sum them up and mod 10
  // it should be 0
  // ref. https://mathsuke.jp/isbncode/
  return (
    code.slice(0, 3) === "978" &&
    code
      .split("")
      .map((e: string, i) => parseInt(e, 10) * [1, 3][i % 2])
      .reduce((a, b) => a + b) %
      10 ===
      0
  );
};

// export const isbnSearch = async (isbn: number) => {
//   const book: Book = {
//   isbn: 0, // 9784560070512,
//   id: 0,
//   isFinished: false,
//   title: "",
//   authors: [],
//   publisher: "",
//   pages: 0,
//   progress: { type: "", progress: 0, date: 0, isFinished: false },
//   history: [],
// };
//   const response = await fetch(
//     "https://api.openbd.jp/v1/get?isbn=" + isbn.toString()
//   );
//   const json = await response.json();
//   const onix = json[0] && json[0];
//   // result.value = JSON.stringify(onix, null, 2);
//   const summary = json[0] && json[0].summary;
//   // picked.value = summary;
//   book.title = summary.title;
//   book.publisher = summary.publisher;
//   book.authors = summary.author.split(" ");
//   book.pages = json[0].onix?.DescriptiveDetail?.Extent[0].ExtentValue;
//   book.cover = summary.cover;
//   book.notes = json[0].onix?.CollateralDetail?.TextContent.map(
//     (e: { Text?: string; TextType?: string; ContentAudience?: string }) =>
//       e.Text
//   ).join("\n\n");
//   return book;
// };

const sorter = (a: Book, b: Book) => {
  const diff: number = a.progress.date - b.progress.date;
  if (diff < 0) {
    return 1;
  }
  if (diff > 0) {
    return -1;
  }
  return 0;
};

export const useBooksState = defineStore({
  id: "books",
  state: () => ({
    books: useStorage("books", []),
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: "all" as "all" | "finished" | "unfinished",
    // type will be automatically inferred to number
    nextId: useStorage("books_nextid", 0),
  }),
  getters: {
    getBookById: (state) => {
      return (bookId: string) => {
        const parsed = parseInt(bookId, 10);
        if (isNaN(parsed)) {
          return null;
        }
        return state.books.find((book: Book) => book.id === parsed);
      };
    },
    finishedbooks(state) {
      // autocompletion! ✨
      return state.books.filter((book: Book) => book.isFinished);
    },
    unfinishedbooks(state) {
      return state.books.filter((book: Book) => !book.isFinished);
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredbooks(): Book[] {
      if (this.filter === "finished") {
        // call other getters with autocompletion ✨
        return this.finishedbooks;
      } else if (this.filter === "unfinished") {
        return this.unfinishedbooks;
      }
      return this.books;
    },
    sortedBooks(): Book[] {
      return this.books.sort(sorter);
    },
  },
  actions: {
    // any amount of arguments, return a promise or not
    addBook(book: Book) {
      const bk: Book = Object.assign({}, book);
      bk.id = this.nextId;
      bk.isFinished = false;
      // you can directly mutate the state
      (this.books as Book[]).push(bk);
      console.log(`added book: ${JSON.stringify(bk)}`);
      this.nextId++;
    },
    updateBook(newbook: Book) {
      const index: number = (this.books as Book[]).findIndex(
        (obj: Book) => obj.id === newbook.id
      );
      if (index < 0) {
        return;
      }
      (this.books as Book[]).splice(index, 1, newbook);
    },
    deleteBook(itemID: number) {
      this.books = this.books.filter((object: Book) => {
        return object.id !== itemID;
      });
    },
    toggleCompleted(idToFind: number) {
      const book = (this.books as Book[]).find(
        (obj: Book) => obj.id === idToFind
      );
      if (!book) {
        return;
      }
      book.isFinished = !book.isFinished;
    },
    updateProgress(idToFind: number, progress: Progress) {
      const book = (this.books as Book[]).find(
        (obj: Book) => obj.id === idToFind
      );
      if (!book) {
        return;
      }
      if (book.progress.progress === progress.progress){
        return;
      }
      const pg = Object.assign({}, progress);
      pg.date = new Date().getTime();
      book.history.push(pg);
      book.progress = pg;
      book.isFinished = pg.isFinished;
    },
    overwriteBooks(books: Book[]) {
      (this.books as Book[]).splice(0);
      (this.books as Book[]).push(...books);
    },
  },
});
