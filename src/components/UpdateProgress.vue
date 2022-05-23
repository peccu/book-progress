<script setup lang="ts">
const props = defineProps({
  id: Number,
  progress: Object,
});

import { useBooksState } from "@/stores/books";
const booksstore = useBooksState();
let progress = { type: "", progress: 0, date: null };

if (typeof props.id !== "undefined" && props.progress !== null) {
  const bookref = booksstore.getBookById(props.id);
  Object.keys(bookref.progress).map(
    (key) => (progress[key] = bookref.progress[key])
  );
}
const updateProgress = () => {
  console.log(`id: ${props.id}, progress: ${JSON.stringify(progress)}`);
  booksstore.updateProgress(props.id, progress);
};
</script>
<template>
  <form>
    <span class="field">
      <input
        type="number"
        placeholder="Pos."
        v-model="progress.progress"
        length="4"
    /></span>
    <span class="field"
      ><input
        type="radio"
        :id="`pgtype-page-${id}`"
        name="progresstype"
        v-model="progress.type"
        value="page"
      />
      <label :for="`pgtype-page-${id}`">page #</label></span
    >
    <span class="field">
      <input
        type="radio"
        :id="`pgtype-%-${id}`"
        name="progresstype"
        v-model="progress.type"
        value="%"
      />
      <label :for="`pgtype-%-${id}`">%</label></span
    >
    <button @click.stop.prevent="updateProgress()">UpdateProgress</button>
  </form>
</template>

<style scoped>
form {
  margin: 0;
  padding: 0;
}
input[type="number"] {
  width: 5em;
}
.field {
  margin: 0 0.3em;
}
input {
  margin: 0 0.3em;
}
</style>
