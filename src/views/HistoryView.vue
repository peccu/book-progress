<script setup lang="ts">
import ProgressHistory from "@/components/book/ProgressHistory.vue";
import { useBooksState, type Book } from "@/stores/books";

const props = defineProps({
  id: String,
});

// const booksstore = useBooksState();
console.log(`picked id: ${props.id}`);

const book: Book = {
  isbn: 0, // 9784560070512,
  id: 0,
  isFinished: false,
  title: "",
  authors: [],
  publisher: "",
  pages: 0,
  progress: { type: "", progress: 0, date: 0, isFinished: false },
  history: [],
};
const booksstore = useBooksState();
if (typeof props.id !== "undefined") {
  const bookref = booksstore.getBookById(props.id);
  if (bookref) {
    Object.keys(bookref).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key) => ((book as { [index: string]: any })[key] = bookref[key])
    );
  }
}
</script>

<template>
  <main>
    <ProgressHistory :book="book"></ProgressHistory>
  </main>
</template>
