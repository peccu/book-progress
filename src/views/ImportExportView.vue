<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useBooksState, type Book } from "@/stores/books";
const booksstore = useBooksState();
const booksExport: Ref<string> = ref(
  JSON.stringify(JSON.parse(localStorage.books), null, 2)
);
const importBooks = (importString: string) => {
  try {
    const books: Book[] = JSON.parse(importString);
    console.log("importing", books);
    booksstore.overwriteBooks(books);
    alert("Done.");
  } catch (e) {
    alert(e);
    console.error(e);
  }
};
</script>

<template>
  <main>
    <div>Export via JSON.parse(localStorage.books)</div>
    <div><textarea v-model="booksExport" rows="40" cols="50"></textarea></div>
    <div><button @click="importBooks(booksExport)">Import</button></div>
  </main>
</template>
