<script setup lang="ts">
import { ref, type Ref } from "vue";
import router from "@/router";
import { useBooksState, type Book } from "@/stores/books";
import type { OpenBd } from "@/stores/openbd";
import BkCover from "@/components/BkCover.vue";

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
  isbn: 9784560070512,
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
    booksstore.addBook(book);
  }
  router.push("/");
};
const cancel = () => {
  router.push("/");
};
// const result: OpenBd[] = [];
const picked: Ref<string> = ref("...");
const result: Ref<string> = ref("...");
const search = async (isbn: string) => {
  // alert(`foo ${isbn}`);
  const response = await fetch("https://api.openbd.jp/v1/get?isbn=" + isbn);
  const json = await response.json();
  const onix = json[0] && json[0];
  result.value = JSON.stringify(onix, null, 2);
  let b = {
    isbn: "9784560070512",
    title: "ライ麦畑でつかまえて",
    volume: "",
    series: "",
    publisher: "白水社",
    pubdate: "1984-05",
    cover: "https://cover.openbd.jp/9784560070512.jpg",
    author: "Salinger,J.D.／著 Salinger,JeromeDavid／著 野崎孝／翻訳 ほか",
  };
  const summary = json[0] && json[0].summary;
  picked.value = summary;
  book.title = summary.title;
  book.publisher = summary.publisher;
  book.authors = summary.author.split(" ");
  book.pages = json[0].onix?.DescriptiveDetail?.Extent[0].ExtentValue;
  book.cover = summary.cover;
  book.notes = json[0].onix?.CollateralDetail?.TextContent.map(
    (e: { Text?: string; TextType?: string; ContentAudience?: string }) =>
      e.Text
  ).join("\n\n");
  //alert(result.value.length);
  const a = {
    onix: {
      RecordReference: "9784560070512",
      NotificationType: "03",
      ProductIdentifier: {
        ProductIDType: "15",
        IDValue: "9784560070512",
      },
      DescriptiveDetail: {
        ProductComposition: "00",
        ProductForm: "BZ",
        Measure: [],
        Collection: {
          CollectionType: "10",
          TitleDetail: {
            TitleType: "01",
            TitleElement: [
              {
                TitleElementLevel: "02",
                TitleText: {
                  content: "白水Uブックス",
                },
              },
            ],
          },
        },
        TitleDetail: {
          TitleType: "01",
          TitleElement: {
            TitleElementLevel: "01",
            TitleText: {
              collationkey: "ライムギバタケ デ ツカマエテ",
              content: "ライ麦畑でつかまえて",
            },
          },
        },
        Contributor: [
          {
            SequenceNumber: "1",
            ContributorRole: ["A01"],
            PersonName: {
              content: "Salinger, J. D.",
            },
          },
          {
            SequenceNumber: "2",
            ContributorRole: ["A01"],
            PersonName: {
              content: "Salinger, Jerome David",
            },
          },
          {
            SequenceNumber: "3",
            ContributorRole: ["B06"],
            PersonName: {
              content: "野崎 孝",
            },
          },
          {
            SequenceNumber: "4",
            ContributorRole: ["A01"],
            PersonName: {
              content: " Salinger J.D.",
            },
          },
          {
            SequenceNumber: "5",
            ContributorRole: ["A01"],
            PersonName: {
              content: "サリンジャー J.D.",
            },
          },
        ],
        Language: [
          {
            LanguageRole: "01",
            LanguageCode: "jpn",
            CountryCode: "JP",
          },
        ],
        Extent: [
          {
            ExtentType: "11",
            ExtentValue: "339",
            ExtentUnit: "03",
          },
        ],
      },
      CollateralDetail: {
        TextContent: [
          {
            TextType: "03",
            ContentAudience: "00",
            Text: "発表から半世紀、いまなお世界中の若者たちの心をとらえつづける名作の名訳。永遠の青春小説。",
          },
        ],
        SupportingResource: [],
      },
      PublishingDetail: {},
      ProductSupply: {
        MarketPublishingDetail: {
          MarketPublishingStatus: "00",
          MarketPublishingStatusNote: "1;",
        },
        SupplyDetail: {
          ProductAvailability: "99",
        },
      },
    },
    hanmoto: {},
    summary: {
      isbn: "9784560070512",
      title: "ライ麦畑でつかまえて",
      volume: "",
      series: "",
      publisher: "白水社",
      pubdate: "1984-05",
      cover: "https://cover.openbd.jp/9784560070512.jpg",
      author: "Salinger,J.D.／著 Salinger,JeromeDavid／著 野崎孝／翻訳 ほか",
    },
  };
};
</script>
<template>
  <div>
    <form @submit.prevent="search(book.isbn)">
      <input v-model="book.isbn" />
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
    <pre>{{ picked }}</pre>
    <pre>{{ result }}</pre>
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
