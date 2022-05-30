<script setup lang="ts">
import router from "@/router";
import { useBooksState, type Book } from "@/stores/books";
import { ref, type Ref } from "vue";
import type { OpenBd } from "@/stores/openbd";

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
const keys = ["isbn", "authors", "publisher", "pages"];
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
  const result: Ref<string> =ref("...");
const search = async (isbn: string) => {
  // alert(`foo ${isbn}`);
  await fetch('https://api.openbd.jp/v1/get?isbn='+isbn)
  .then(result => alert(typeof result))
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
        Measure: [
          {
            MeasureType: "01",
            Measurement: "180",
            MeasureUnitCode: "mm",
          },
        ],
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
        SupportingResource: [
          {
            ResourceContentType: "01",
            ContentAudience: "01",
            ResourceMode: "03",
            ResourceVersion: [
              {
                ResourceForm: "02",
                ResourceVersionFeature: [
                  {
                    ResourceVersionFeatureType: "01",
                    FeatureValue: "D502",
                  },
                  {
                    ResourceVersionFeatureType: "04",
                    FeatureValue: "9784560070512.jpg",
                  },
                ],
                ResourceLink: "https://cover.openbd.jp/9784560070512.jpg",
              },
            ],
          },
        ],
      },
      PublishingDetail: {
        Imprint: {
          ImprintIdentifier: [
            {
              ImprintIDType: "19",
              IDValue: "560",
            },
          ],
          ImprintName: "白水社",
        },
        PublishingDate: [
          {
            PublishingDateRole: "01",
            Date: "",
          },
        ],
      },
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
    hanmoto: {
      datecreated: "2016-08-23 22:58:23",
      reviews: [
        {
          post_user: "genkina",
          reviewer: "日暮雅通（翻訳家）",
          source_id: 29,
          kubun_id: 1,
          source: "毎日新聞",
          choyukan: "朝刊",
          han: "",
          link: "",
          appearance: "2018-02-11",
          gou: "",
        },
        {
          post_user: "genkina",
          reviewer: "北上次郎（書評家）",
          source_id: 7,
          kubun_id: 1,
          source: "産經新聞",
          choyukan: "朝刊",
          han: "",
          link: "",
          appearance: "2018-09-09",
          gou: "",
        },
        {
          post_user: "genkina",
          reviewer: "沼野充義（スラブ文学者）",
          source_id: 20,
          kubun_id: 1,
          source: "読売新聞",
          choyukan: "朝刊",
          han: "",
          link: "",
          appearance: "2020-10-11",
          gou: "",
        },
      ],
      dateshuppan: "1984-05",
      datemodified: "2016-08-23 22:58:23",
    },
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
  //alert(result.value)
  result.value = JSON.stringify(a, null, 2)
  // alert(result.value)
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
  <div>
    <button @click="saveBook()">Save</button>
    <button @click="cancel()">Cancel</button>
  </div>
  <div>
    <button @click="search(book.isbn)">Search</button>
    <pre>{{result}}</pre>
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
