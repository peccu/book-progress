<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
const notes = [
  {
    when: "2022/6/2",
    note: "新規登録した本がリストの上位に並ぶように変更。<br/>Aboutページスタイル調整",
  },
  { when: "2022/6/1", note: "リリースノート追加" },
  {
    when: "2022/5/29ごろ",
    note: "ISBNで検索、最近進捗更新したものが上に来るようにソート、バーコードリーダー追加",
  },
  {
    when: "2022/5/25ごろ",
    note: "本の登録、進捗の登録、インポートエクスポートができるようになる。",
  },
  {
    when: "2022/5中旬",
    note: "localStorageでいいやん。と気づき開発開始。ちょうどvue3とviteの組み合わせも整っててタイミングよかった。",
  },
];
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Release Notes</template>

    <ul>
      <li v-for="(note, i) in notes" :key="i">
        <span class="when">{{ note.when }}</span> :
        <span class="note" v-html="note.note"></span>
      </li>
    </ul>
  </WelcomeItem>
</template>
<style scoped>
ul {
  padding: 1em;
}
li {
  list-style-type: none;
}
</style>
