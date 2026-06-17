<script setup lang="ts">
import { computed } from "vue";
import { useBooksState, type Progress, type Book } from "@/stores/books";
import { format } from "@/stores/date";

const props = defineProps({
  id: Number,
  progress: Object,
});

const booksstore = useBooksState();
let progress: Progress = { type: "", progress: 0, date: 0, isFinished: false };

const isFinished = computed(() => {
  if (typeof props.id === "undefined") {
    return false;
  }
  const book = booksstore.getBookById(props.id.toString());
  return book ? (book as Book).isFinished : false;
});
const toggleFinished = () => {
  if (typeof props.id === "undefined") {
    return;
  }
  booksstore.toggleCompleted(props.id);
};

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
  const updated = booksstore.getBookById(props.id.toString());
  if (!updated) {
    return;
  }
  progress.date = (updated as Book).progress.date;
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
    <span class="field">
      <input
        type="checkbox"
        :id="`finished-${id}`"
        :checked="isFinished"
        @change="toggleFinished"
        @click.stop
      />
      <label :for="`finished-${id}`" @click.stop>読み終わった</label></span
    >
    <div class="actions">
      <button @click.stop.prevent="updateProgress()">UpdateProgress</button>
      <span class="lastupdate">{{ format(progress.date) }}</span>
    </div>
  </form>
</template>

<style scoped>
form {
  margin: 0;
  padding: 0;
}
input[type="text"] {
  width: 4.5em;
  vertical-align: middle;
}
input[type="radio"],
input[type="checkbox"] {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin: 0;
}
.field {
  margin: 0 0.4em;
  vertical-align: middle;
  line-height: 1;
}
.field label {
  padding: 0.1em 0.3em;
  cursor: pointer;
  vertical-align: middle;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8em;
  margin-top: 1.5em;
}
button {
  padding: 0.5em 1em;
  min-height: 2.4em;
}
.lastupdate {
  white-space: nowrap;
}
input {
  margin: 0 0.3em;
}
</style>
