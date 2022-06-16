<script setup lang="ts">
import NewBookForm from "@/components/book/NewBookForm.vue";
import { useBooksState } from "@/stores/books";
// import { storeToRefs } from "pinia";

const booksstore = useBooksState();
// const { books } = storeToRefs(booksstore);

// console.log(`picked book: ${JSON.stringify(booksstore.getBookById(props.id))}`);

const initbooks = () => {
  booksstore.addBook({
    isbn: 9782233445566,
    id: 0,
    isFinished: false,
    title: "The Book 1",
    authors: ["john"],
    publisher: "AB Books",
    pages: 339,
    progress: {
      type: "page",
      progress: 24,
      date: new Date(2022, 4, 18).getTime(),
      isFinished: false,
    },
    history: [
      {
        type: "",
        progress: 0,
        date: new Date(2022, 4, 1).getTime(),
        isFinished: false,
      },
      {
        type: "%",
        progress: 3,
        date: new Date(2022, 4, 3).getTime(),
        isFinished: false,
      },
      {
        type: "%",
        progress: 8,
        date: new Date(2022, 4, 7).getTime(),
        isFinished: false,
      },
      {
        type: "%",
        progress: 13,
        date: new Date(2022, 4, 8).getTime(),
        isFinished: false,
      },
      {
        type: "%",
        progress: 14,
        date: new Date(2022, 4, 9).getTime(),
        isFinished: false,
      },
      {
        type: "%",
        progress: 15,
        date: new Date(2022, 4, 15).getTime(),
        isFinished: false,
      },
    ],
  });
  booksstore.addBook({
    isbn: 9782233445566,
    id: 0,
    isFinished: false,
    title: "The Book 2",
    authors: ["john", "brown"],
    publisher: "AB Books",
    pages: 0,
    progress: {
      type: "%",
      progress: 42,
      date: new Date(2022, 4, 18).getTime(),
      isFinished: false,
    },
    history: [
      {
        type: "",
        progress: 0,
        date: new Date(2022, 4, 3).getTime(),
        isFinished: false,
      },
      {
        type: "%",
        progress: 13,
        date: new Date(2022, 4, 3).getTime(),
        isFinished: false,
      },
    ],
  });
};
// const book = booksstore.getBookById(props.id);
</script>

<template>
  <main>
    <NewBookForm />
    <button @click="initbooks()">add sample books</button>
  </main>
</template>
