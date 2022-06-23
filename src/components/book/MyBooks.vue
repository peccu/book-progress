<script setup lang="ts">
import BookProgress from "./BookProgress.vue";
import BookDetail from "./BookDetail.vue";
import UpdateProgress from "./UpdateProgress.vue";
import { RouterLink } from "vue-router";

import { useBooksState, type Book } from "@/stores/books";
// import { storeToRefs } from "pinia";
const booksstore = useBooksState();
// const { books } = storeToRefs(booksstore);
const books = booksstore.sortedBooks;
const deleteBook = (id: number) => {
  var result = confirm("Want to delete?");
  if (!result) {
    return;
  }
  booksstore.deleteBook(id);
};
</script>

<template>
  <div v-for="book in (books as Book[])" :key="book && book.id">
    <details>
      <summary>
        <span class="hideonopen">&#128216;</span>
        <span class="showonopen">&#128214;</span>
        {{ book.id }}:
        <span class="hideonopen"
          ><BookProgress :book="book"></BookProgress><br />
          {{ book.title }}</span
        >
        <UpdateProgress
          class="showonopen"
          :id="book.id"
          :progress="book.progress"
        ></UpdateProgress>
      </summary>
      <div style="display: none">
        <UpdateProgress
          :id="book.id"
          :progress="book.progress"
        ></UpdateProgress>
      </div>
      <BookDetail :book="book"></BookDetail>
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
details[open] .hideonopen {
  display: none;
}

details[open] .showonopen {
  display: inherit;
}
details .showonopen {
  display: none;
}

details[open] {
  padding: 0.5em;
}

details[open] summary {
  border-bottom: 1px solid #aaa;
  margin-bottom: 0.5em;
}

summary::-webkit-details-marker {
  display: none;
}
</style>
