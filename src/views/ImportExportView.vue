<script setup lang="ts">
import { useBooksState, type Book } from "@/stores/books";

const booksstore = useBooksState();

const booksstring: string = JSON.stringify(
  JSON.parse(localStorage.books),
  null,
  2
);
const importBooks = () => {
  const books: Book[] = JSON.parse(booksstring);
  booksstore.overwriteBooks(books);
  alert("Done.");
};
</script>

<template>
  <main>
    <div>JSON.parse(localStorage.books)</div>
    <textarea v-model="booksstring" rows="40" cols="50"></textarea>
    <div><button @click="importBooks">Import</button></div>
  </main>
</template>
