<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useBooksState, type Book } from "@/stores/books";
import copy from "@/stores/copy";
import paste from "@/stores/paste";
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
const pasteBooks = async () => {
  booksExport.value = await paste() as string;
};
</script>

<template>
  <main>
    <div>Export via JSON.parse(localStorage.books)</div>
    <div>
      <button @click="copy(booksExport)">Copy</button>
      <button @click="importBooks(booksExport)">Import</button>
      <button @click="pasteBooks()">Paste</button>
    </div>
    <div><textarea v-model="booksExport" rows="15" cols="50"></textarea></div>
  </main>
</template>
