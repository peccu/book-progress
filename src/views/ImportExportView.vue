<script setup lang="ts">
import { useBooksState, type Book } from "@/stores/books";
const booksstore = useBooksState();
const booksExport: string = JSON.stringify(
  JSON.parse(localStorage.books),
  null,
  2
);
const importBooks = (importString: string) => {
  const books: Book[] = JSON.parse(importString);
  console.log("importing", books);
  booksstore.overwriteBooks(books);
  alert("Done.");
};
</script>

<script lang="ts">
export default {
  data() {
    return {
      booksImport: "",
    };
  },
};
</script>

<template>
  <main>
    <div>Export via JSON.parse(localStorage.books)</div>
    <div><textarea v-model="booksExport" rows="40" cols="50"></textarea></div>
    <div>↓</div>
    <div>
      <textarea v-model="booksImport" placeholder="paste here"></textarea>
    </div>
    <div><button @click="importBooks(booksImport)">Import</button></div>
  </main>
</template>
