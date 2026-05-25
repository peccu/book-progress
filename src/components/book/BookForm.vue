<script setup lang="ts">
import { ref, type Ref } from "vue";
import router from "@/router";
import { useBooksState, type Book } from "@/stores/books";
import BkCover from "./BkCover.vue";

const props = defineProps({
  id: String,
});

const booksstore = useBooksState();
console.log(`BF: picked id: ${props.id}`);
if (typeof props.id !== "undefined") {
  console.log(
    `BF: picked book: ${JSON.stringify(booksstore.getBookById(props.id))}`
  );
}
console.log(`typeof id: ${typeof props.id}`);

const book: Book = {
  isbn: 0, // 9784560070512,
  id: 0,
  isFinished: false,
  title: "",
  authors: [],
  publisher: "",
  pages: 0,
  progress: { type: "", progress: 0, date: 0, isFinished: false },
  history: [],
};

if (typeof props.id !== "undefined") {
  const bookref = booksstore.getBookById(props.id);
  if (bookref) {
    Object.keys(bookref).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key) => ((book as { [index: string]: any })[key] = bookref[key])
    );
  }
}
const keys = ["authors", "publisher", "pages", "cover"];
const saveBook = () => {
  console.log(`book: ${JSON.stringify(book)}`);
  if (typeof props.id !== "undefined") {
    booksstore.updateBook(book);
  } else {
    book.progress.date = new Date().getTime();
    book.history.push(book.progress);
    booksstore.addBook(book);
  }
  router.push("/");
};
const cancel = () => {
  router.push("/");
};
const result: Ref<string> = ref("");
const searchOpenBd = async (isbn: string): Promise<boolean> => {
  const response = await fetch("https://api.openbd.jp/v1/get?isbn=" + isbn);
  const json = await response.json();
  if (!json[0]) return false;
  const summary = json[0].summary;
  book.title = summary.title;
  book.publisher = summary.publisher;
  book.authors = summary.author.split(" ");
  book.pages = json[0].onix?.DescriptiveDetail?.Extent[0].ExtentValue;
  book.cover = summary.cover;
  book.notes = json[0].onix?.CollateralDetail?.TextContent?.map(
    (e: { Text?: string; TextType?: string; ContentAudience?: string }) =>
      e.Text
  ).join("\n\n");
  return true;
};

const searchGoogleBooks = async (isbn: string): Promise<boolean> => {
  const response = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn
  );
  const json = await response.json();
  if (!json.items?.[0]) return false;
  const info = json.items[0].volumeInfo;
  book.title = info.title ?? "";
  book.publisher = info.publisher ?? "";
  book.authors = info.authors ?? [];
  book.pages = info.pageCount;
  book.cover = info.imageLinks?.thumbnail ?? "";
  book.notes = info.description ?? "";
  return true;
};

const search = async (isbn: number) => {
  result.value = "";
  const isbnStr = isbn.toString();
  const found = await searchOpenBd(isbnStr) || await searchGoogleBooks(isbnStr);
  if (!found) result.value = "Not found";
};
</script>
<template>
  <div style="max-width: 100%">
    <form @submit.prevent="search(book.isbn)">
      <input inputmode="numeric" pattern="[0-9]*" type="text" v-model="book.isbn" />
      <button @click="search(book.isbn)">ISBN Search</button>
    </form>
  </div>
  <p>Title <input placeholder="Book Title" v-model="book.title" /></p>
  <dl>
    <template v-for="(info, i) in keys" :key="i">
      <dt>{{ info }}:</dt>
      <dd>
        <input v-model="book[info]" />
      </dd>
    </template>
    <dt>notes:</dt>
    <dd>
      <textarea v-model="book.notes" rows="10" cols="50"></textarea>
    </dd>
  </dl>
  <div>
    <button @click="saveBook()">Save</button>
    <button @click="cancel()">Cancel</button>
  </div>
  <BkCover :cover="book.cover" />
  <div>
    <p v-if="result">{{ result }}</p>
  </div>
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
