<script setup lang="ts">
import BookForm from "@/components/book/BookForm.vue";
// import { useBooksState } from "@/stores/books";

const props = defineProps({
  id: String,
});

// const booksstore = useBooksState();
console.log(`picked id: ${props.id}`);
</script>

<template>
this is history view
  <main>
    <BookForm :id="id" />
  </main>
</template>
