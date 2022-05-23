import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useBooksState = defineStore({
  id: "books",
  state: () => ({
    /** @type {{
          title: string,
          authors: string[],
          publisher: string,
          pages: number,
          progress: { type: string, progress: number, date: number, isFinished: boolean },
          history: { type: string, progress: number, date: number, isFinished: boolean }[],
          isFinished: boolean
        }} */
    books: useStorage("books", []),
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: "all",
    // type will be automatically inferred to number
    nextId: useStorage("books_nextid", 0),
  }),
  getters: {
    getBookById: (state) => {
      return (bookId) => {
        const parsed = parseInt(bookId, 10);
        if (isNaN(parsed)) {
          return {};
        }
        return state.books.find((book) => book.id === parsed);
      };
    },
    finishedbooks(state) {
      // autocompletion! ✨
      return state.books.filter((book) => book.isFinished);
    },
    unfinishedbooks(state) {
      return state.books.filter((book) => !book.isFinished);
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredbooks() {
      if (this.filter === "finished") {
        // call other getters with autocompletion ✨
        return this.finishedbooks;
      } else if (this.filter === "unfinished") {
        return this.unfinishedbooks;
      }
      return this.books;
    },
  },
  actions: {
    // any amount of arguments, return a promise or not
    addBook(book) {
      const bk = Object.assign({}, book);
      bk.id = this.nextId;
      bk.isFinished = false;
      // you can directly mutate the state
      this.books.push(bk);
      console.log(`added book: ${JSON.stringify(bk)}`);
      this.nextId++;
    },
    updateBook(newbook) {
      const index = this.books.find((obj) => obj.id === newbook.id);
      this.books.splice(index, 1, newbook);
    },
    deleteBook(itemID) {
      this.books = this.books.filter((object) => {
        return object.id !== itemID;
      });
    },
    toggleCompleted(idToFind: number) {
      const book = this.books.find((obj) => obj.id === idToFind);
      if (book) {
        book.isFinished = !book.isFinished;
      }
    },
    updateProgress(idToFind: number, progress) {
      const book = this.books.find((obj) => obj.id === idToFind);
      if (book) {
        progress.date = new Date().getTime();
        const pg = Object.assign({}, progress);
        book.history.push(pg);
        book.progress = progress;
        book.isFinished = progress.isFinished;
      }
    },
  },
});
