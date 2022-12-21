<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useBooksState, type Book } from "@/stores/books";
import copy from "@/stores/copy";
import paste from "@/stores/paste";
import download from "@/stores/download";
import readfile from "@/stores/readfile";
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
  booksExport.value = (await paste()) as string;
};

const progress: Ref<number> = ref(0);
const setResult = (result: string) => {
  booksExport.value = result;
};
const setProgress = (percent: number) => {
  progress.value = Math.round(percent);
  console.log(`Progress: ${Math.round(percent)}`);
};
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
