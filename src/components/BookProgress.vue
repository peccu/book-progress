<script setup lang="ts">
import type { Book } from "@/stores/books";
const props = defineProps({
  book: Object,
});
const max = (book: Book) => {
  const isPage = book.progress.type == "page";
  return isPage ? book.pages : 100;
};
const progress = (book: Book) => {
  const isPage = book.progress.type == "page";
  const p = book.progress.progress;
  const percent = isPage ? Math.round((100 * p) / book.pages) : p;
  return percent + "%" + (isPage ? " (" + p + "p/" + book.pages + "p)" : "");
};
</script>

<template>
  <progress
    :id="'book' + book.id"
    :max="max(book)"
    :value="book.progress.progress"
  ></progress>
  {{ progress(book) }}
</template>

<style scoped>
progress {
  margin-left: 0.5em;
}
</style>
