<script setup lang="ts">
import { type Book } from "@/stores/books";
import BkCover from "@/components/BkCover.vue";
const props = defineProps({
  book: Object,
  cover: String,
});
</script>
<template>
  <h3>{{ book.title }}</h3>
  <dl>
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
