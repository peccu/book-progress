<script setup lang="ts">
const props = defineProps({
  id: String,
});
import router from "@/router";
import { useBooksState } from "@/stores/books";
const booksstore = useBooksState();
console.log(`BF: picked id: ${props.id}`);
console.log(
  `BF: picked book: ${JSON.stringify(booksstore.getBookById(props.id))}`
);
console.log(`typeof id: ${typeof props.id}`);

const book = {
  title: "",
  authors: [],
  publisher: "",
  pages: null,
  progress: null,
  history: [],
};

if (typeof props.id !== "undefined") {
  const bookref = booksstore.getBookById(props.id);
  Object.keys(bookref).map((key) => (book[key] = bookref[key]));
}
const keys = ["authors", "publisher", "pages"];
const saveBook = () => {
  console.log(`book: ${JSON.stringify(book)}`);
  if (typeof props.id !== "undefined") {
    booksstore.updateBook(book);
  } else {
    booksstore.addBook(book);
  }
  router.push("/");
};
const cancel = () => {
  router.push("/");
};
</script>
<template>
  <p>Title <input placeholder="Book Title" v-model="book.title" /></p>
  <dl>
    <template v-for="(info, i) in keys" :key="i">
      <dt>{{ info }}:</dt>
      <dd>
        <input v-model="book[info]" />
      </dd>
    </template>
  </dl>
  <button @click="saveBook()">Save</button>

  <button @click="cancel()">Cancel</button>
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
