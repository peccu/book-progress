<script setup lang="ts">
import { useBooksState, type Book } from "@/stores/books";
import copy from "@/stores/copy";
import download from "@/stores/download";
import readfile from "@/stores/readfile";
import { useProgress } from "@/components/ImportExport/readfileProgress";
import { useBooksExport } from "@/components/ImportExport/booksRepresents";
const booksstore = useBooksState();
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
const { booksExport, pasteBooks, setResult } = useBooksExport(
  localStorage.books
);
const { progress, setProgress } = useProgress();
const fileSelected = (event: Event) => {
  progress.value = 0;
  readfile(event, setResult, setProgress);
};
</script>

<template>
  <main>
    <div>
      <h3>via Clipboard</h3>
      <button @click="copy(booksExport)">Copy</button>
      <button @click="pasteBooks()">Paste</button>
    </div>
    <div>
      <h3>via File</h3>
      <button @click="download(booksExport)">Download</button>
      <input type="file" @change="fileSelected" />
      <progress max="100" :value="progress" />
    </div>
    <div>
      <h3>by Hand</h3>
      <textarea v-model="booksExport" rows="15" cols="50"></textarea>
    </div>
    <div>
      <button @click="importBooks(booksExport)">Import</button>
    </div>
  </main>
</template>
