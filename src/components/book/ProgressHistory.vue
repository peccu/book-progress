<script setup lang="ts">
import type { Progress } from "@/stores/books";
import BkCover from "./BkCover.vue";
import { format } from "@/stores/date";
const props = defineProps({
  book: Object,
});
const historySorter = (a: Progress, b: Progress) => b.date - a.date;
const sortReverseHistory = (histories: Progress[]) => {
  histories.sort(historySorter);
  return histories;
};
</script>
<template>
  <h3>{{ book.title }}</h3>
  <dl>
    <dt>Curent Position:</dt>
    <dd>{{ format(book.progress.date) }}</dd>
    <dt>Progress History:</dt>
    <dd>
      <ul>
        <li v-for="(history, i) in sortReverseHistory(book.history)" :key="i">
          <template v-if="history.type === 'page'">P.</template>
          {{ history.progress }}
          <template v-if="history.type !== 'page'">%</template>
          :
          {{ format(history.date) }}
          <template v-if="history.isFinished">Completed</template>
        </li>
      </ul>
    </dd>
    <dt>Authors:</dt>
    <dd>
      {{ book.authors }}
    </dd>
    <dt>Publisher:</dt>
    <dd>
      {{ book.publisher }}
    </dd>
    <dt>Pages:</dt>
    <dd>
      {{ book.pages === null ? "" : book.pages }}
    </dd>
    <dt>ISBN:</dt>
    <dd>
      {{ book.isbn === null ? "" : book.isbn }}
    </dd>
    <dt>Notes:</dt>
    <dd style="white-space: pre-wrap">
      {{ book.notes === null ? "" : book.notes }}
    </dd>
  </dl>
  <BkCover :cover="book.cover" />
</template>

<style scoped>
h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

dt {
  font-weight: bold;
}

dl,
dd {
  font-size: 0.9rem;
}

dd {
  margin-bottom: 1em;
}
</style>
