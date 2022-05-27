<script setup lang="ts">
import { useBooksState, type Progress, type Book } from "@/stores/books";

const props = defineProps({
  id: Number,
  progress: Object,
});

const booksstore = useBooksState();
let progress: Progress = { type: "", progress: 0, date: 0, isFinished: false };

if (typeof props.id !== "undefined" && props.progress !== null) {
  const bookref = booksstore.getBookById(props.id.toString());
  if (bookref) {
    Object.keys((bookref as Book).progress).map(
      (key: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((progress as { [index: string]: any })[key] =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((bookref as Book).progress as { [index: string]: any })[key])
    );
  }
}
const updateProgress = () => {
  console.log(`id: ${props.id}, progress: ${JSON.stringify(progress)}`);
  if (!props || props.id == undefined) {
    return;
  }
  booksstore.updateProgress(props.id, progress);
};
const clearnumber = () => {
  console.log("focus", progress.progress);
  progress.progress = 0;
};
</script>
<template>
  <form>
    <span class="field">
      <input
        type="number"
        placeholder="Pos."
        @focus="clearnumber"
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
