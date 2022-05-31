<script setup lang="ts">
import { type Book } from "@/stores/books";
import BkCover from "@/components/BkCover.vue";
const props = defineProps({
  book: Object,
  cover: String,
});
</script>
<template>
  <p>{{ book.title }}</p>
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
  </dl>
  <BkCover :cover="book.cover" />
</template>

<style scoped>
p,
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
