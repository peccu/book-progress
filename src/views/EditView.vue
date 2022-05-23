<script setup lang="ts">
const props = defineProps({
  id: String,
});
import BookForm from "@/components/BookForm.vue";

import { useBooksState } from "@/stores/books";
import { storeToRefs } from "pinia";
const booksstore = useBooksState();
// const { books } = storeToRefs(booksstore);
console.log(`picked id: ${props.id}`);
console.log(`picked book: ${JSON.stringify(booksstore.getBookById(props.id))}`);

const initbooks = () => {
  booksstore.addBook({
    title: "The Book 1",
    authors: ["john"],
    publisher: "AB Books",
    pages: 339,
    progress: {
      type: "page",
      progress: 24,
      date: new Date(2022, 4, 18).getTime(),
    },
    history: [
      { type: "%", progress: 13, date: new Date(2022, 4, 3).getTime() },
    ],
  });
  booksstore.addBook({
    title: "The Book 2",
    authors: ["john", "brown"],
    publisher: "AB Books",
    pages: null,
    progress: {
      type: "%",
      progress: 42,
      date: new Date(2022, 4, 18).getTime(),
    },
    history: [
      { type: "%", progress: 13, date: new Date(2022, 4, 3).getTime() },
    ],
  });
};
// const book = booksstore.getBookById(props.id);
</script>

<template>
  <main>
    <button @click="initbooks()">init book</button>
    <BookForm :id="id" />
  </main>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
