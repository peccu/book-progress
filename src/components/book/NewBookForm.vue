<script setup lang="ts">
import { ref, type Ref } from "vue";
import router from "@/router";
import { useBooksState, type Book } from "@/stores/books";
import { validateIsbn } from "@/stores/books";
import BkCover from "./BkCover.vue";
import QRCodeReader from "./QRCodeReader.vue";
import type { DetectedBarcode } from "barcode-detector";

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

const book = ref<Book>({
  isbn: 0, // 9784560070512,
  id: 0,
  isFinished: false,
  title: "",
  authors: [],
  publisher: "",
  pages: 0,
  progress: { type: "", progress: 0, date: 0, isFinished: false },
  history: [],
});

if (typeof props.id !== "undefined") {
  const bookref = booksstore.getBookById(props.id);
  if (bookref) {
    Object.keys(bookref).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key) => ((book as { [index: string]: any })[key] = bookref[key])
    );
  }
}
const keys = ["authors", "publisher", "cover"];
const saveBook = () => {
  console.log(`book: ${JSON.stringify(book.value)}`);
  if (typeof props.id !== "undefined") {
    booksstore.updateBook(book.value);
  } else {
    book.value.progress.date = new Date().getTime();
    book.value.history.push(book.value.progress);
    booksstore.addBook(book.value);
  }
  router.push("/");
};
const cancel = () => {
  router.push("/");
};

function onDetect(detectedCodes: DetectedBarcode[]) {
  const isbns = detectedCodes
    .map((code) => code.rawValue)
    .filter((code) => validateIsbn(code));
  if (isbns.length > 0) {
    setIsbn(isbns[0]);
  }
}

const setIsbn = (code: string) => {
  book.value.isbn = parseInt(code, 10);
  // search(book.value.isbn);
};
interface OpenLibrarySearchItem {
  key: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  isbn?: string[];
  cover_i?: number;
  publisher?: string[];
}

const result: Ref<string> = ref("");
const textQuery = ref("");
const searchResults = ref<OpenLibrarySearchItem[]>([]);

const searchByText = async () => {
  if (!textQuery.value) return;
  result.value = "";
  const response = await fetch(
    "https://openlibrary.org/search.json?q=" + encodeURIComponent(textQuery.value) + "&limit=10"
  );
  const json = await response.json();
  searchResults.value = json.docs ?? [];
  if (searchResults.value.length === 0) result.value = "Not found";
};

const selectResult = (item: OpenLibrarySearchItem) => {
  book.value.title = item.title ?? "";
  book.value.authors = item.author_name ?? [];
  book.value.publisher = item.publisher?.[0] ?? "";
  book.value.cover = item.cover_i
    ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
    : "";
  const isbnStr = item.isbn?.[0];
  if (isbnStr) book.value.isbn = parseInt(isbnStr, 10);
  searchResults.value = [];
};

const searchOpenBd = async (isbn: string): Promise<boolean> => {
  const response = await fetch("https://api.openbd.jp/v1/get?isbn=" + isbn);
  const json = await response.json();
  if (!json[0]) return false;
  const summary = json[0].summary;
  book.value.title = summary.title;
  book.value.publisher = summary.publisher;
  book.value.authors = summary.author.split(" ");
  book.value.pages = json[0].onix?.DescriptiveDetail?.Extent[0].ExtentValue;
  book.value.cover = summary.cover;
  book.value.notes = json[0].onix?.CollateralDetail?.TextContent?.map(
    (e: { Text?: string; TextType?: string; ContentAudience?: string }) =>
      e.Text
  ).join("\n\n");
  return true;
};

const searchOpenLibrary = async (isbn: string): Promise<boolean> => {
  const response = await fetch(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
  );
  const json = await response.json();
  const data = json[`ISBN:${isbn}`];
  if (!data) return false;
  book.value.title = data.title ?? "";
  book.value.publisher = data.publishers?.[0]?.name ?? "";
  book.value.authors = data.authors?.map((a: { name: string }) => a.name) ?? [];
  book.value.pages = data.number_of_pages ?? 0;
  book.value.cover = data.cover?.medium ?? data.cover?.large ?? "";
  book.value.notes = typeof data.notes === "string" ? data.notes : (data.notes?.value ?? "");
  return true;
};

const search = async (isbn: number) => {
  result.value = "";
  const isbnStr = isbn.toString();
  const found = await searchOpenBd(isbnStr) || await searchOpenLibrary(isbnStr);
  if (!found) result.value = "Not found";
};
</script>
<template>
  <div style="max-width: 100%">
    <QRCodeReader :detect="onDetect"></QRCodeReader>
    <hr />
    <form @submit.prevent="search(book.isbn)">
      <input inputmode="numeric" pattern="[0-9]*" type="text" v-model="book.isbn" />
      <button @click="search(book.isbn)">ISBN Search</button>
    </form>
    <form @submit.prevent="searchByText">
      <input v-model="textQuery" placeholder="Search by title, author..." />
      <button type="submit">Text Search</button>
    </form>
    <ul v-if="searchResults.length > 0" class="search-results">
      <li
        v-for="item in searchResults"
        :key="item.key"
        @click="selectResult(item)"
      >
        <span class="result-title">{{ item.title }}</span>
        <span class="result-meta">{{ item.author_name?.join(", ") }} {{ item.first_publish_year }}</span>
      </li>
    </ul>
  </div>
  <p>Title <input placeholder="Book Title" v-model="book.title" /></p>
  <dl>
    <template v-for="(info, i) in keys" :key="i">
      <dt>{{ info }}:</dt>
      <dd>
        <input v-model="book[info]" />
      </dd>
    </template>
    <dt>pages:</dt>
    <dd>
      <input
        inputmode="numeric"
        pattern="[0-9]*"
        type="text"
        v-model="book.pages"
        @focus="($event?.target as HTMLInputElement).select()"
      />
    </dd>
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

.search-results {
  list-style: none;
  padding: 0;
  margin: 0.5em 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.search-results li {
  padding: 0.5em;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
}

.search-results li:last-child {
  border-bottom: none;
}

.search-results li:hover {
  background: #f0f0f0;
}

.result-title {
  font-weight: bold;
  font-size: 0.9rem;
}

.result-meta {
  font-size: 0.8rem;
  color: #666;
}
</style>
