<script setup lang="ts">
import { useBooksState, type Progress, type Book } from "@/stores/books";
import { format } from "@/stores/date";

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
</script>
<script lang="ts">
// export default {
//   mounted() {
//     this.$refs.input.focus();
//   },
// };
</script>
<template>
  <form>
    <span class="field">
      <input
        ref="input"
        inputmode="numeric"
        pattern="[0-9]*"
        type="text"
        placeholder="Pos."
        v-model="progress.progress"
        length="4"
        @focus="($event?.target as HTMLInputElement).select()"
    /></span>
    <span class="field"
      ><input
        type="radio"
        :id="`pgtype-page-${id}`"
        name="progresstype"
        v-model="progress.type"
        @click.stop
        value="page"
      />
      <label :for="`pgtype-page-${id}`" @click.stop>page #</label></span
    >
    <span class="field">
      <input
        type="radio"
        :id="`pgtype-%-${id}`"
        name="progresstype"
        v-model="progress.type"
        @click.stop
        value="%"
      />
      <label :for="`pgtype-%-${id}`" @click.stop>%</label></span
    >
    <button @click.stop.prevent="updateProgress()">UpdateProgress</button>
    <div>{{ format(progress.date) }}</div>
  </form>
</template>

<style scoped>
form {
  margin: 0;
  padding: 0;
}
input[type="text"] {
  width: 3em;
}
.field {
  margin: 0 0.3em;
}
input {
  margin: 0 0.3em;
}
</style>
