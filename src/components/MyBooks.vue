<script setup lang="ts">
import BookProgress from "@/components/BookProgress.vue";
import BookDetail from "@/components/BookDetail.vue";
import UpdateProgress from "@/components/UpdateProgress.vue";
import { RouterLink } from "vue-router";

import { useBooksState } from "@/stores/books";
import { storeToRefs } from "pinia";
const booksstore = useBooksState();
const { books } = storeToRefs(booksstore);
const deleteBook = (id) => {
  var result = confirm("Want to delete?");
  if (!result) {
    return;
  }
  booksstore.deleteBook(id);
};
</script>

<template>
  <div v-for="book in books" :key="book.id">
    <details>
      <summary>
        {{ book.id }}: <span class="title">{{ book.title }}</span>
        <BookProgress :book="book"></BookProgress>
      </summary>
      <BookDetail :book="book"></BookDetail>
      <div>
        <UpdateProgress
          :id="book.id"
          :progress="book.progress"
        ></UpdateProgress>
      </div>
      <div>
        <RouterLink :to="'/edit/' + book.id"><button>Edit</button></RouterLink>
        <button @click="deleteBook(book.id)">Delete</button>
      </div>
    </details>
  </div>
</template>

<style scoped>
details {
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0.5em 0.5em 0;
  min-width: 25em;
}

summary {
  font-weight: bold;
  margin: -0.5em -0.5em 0;
  padding: 0.5em;
}
details[open] summary .title {
  display: none;
}

details[open] {
  padding: 0.5em;
}

details[open] summary {
  border-bottom: 1px solid #aaa;
  margin-bottom: 0.5em;
}
</style>
