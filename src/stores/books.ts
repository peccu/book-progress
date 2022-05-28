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
}
// interface Filter {'all' | 'finished' | 'unfinished'}

const sorter = (a: Book, b: Book) => {
  const diff: number = a.progress.date - b.progress.date;
  if (diff > 0) {
    return 1;
  }
  if (diff < 0) {
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
