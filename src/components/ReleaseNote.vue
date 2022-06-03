<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
const notes = [
  // {when: "", note: []},
  {
    when: "2022/6/3",
    note: [
      "Add to Home Screen対応",
      "Import/Exportのテキストエリアのサイズ変更、コピーボタン追加",
      "進捗入力欄を上に移動",
      "detals summaryのアイコンをデフォルトから本の絵文字に変更",
    ],
  },
  {
    when: "2022/6/2",
    note: [
      "新規登録した本がリストの上位に並ぶように変更",
      "Aboutページスタイル調整",
      "ページの進捗をパーセント表記を前にしてパーセントの進捗と表記を似せた",
      "本の紹介文などの改行がつぶれたのを修正",
      "進捗入力フォームのキーボードを数字のみに変更",
      "プログレスバーの位置を変更",
      "本の情報編集時はカメラを起動しないようにした",
      "進捗入力時に既存の数字を全選択するようにした",
    ],
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
const formatNote = (note: string | string[]): string => {
  if (typeof note === "string") {
    return note;
  }
  return note.join("<br/>");
};
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Release Notes</template>

    <dl>
      <template v-for="(note, i) in notes" :key="i">
        <dt class="when">{{ note.when }}</dt>
        <dd class="note" v-html="formatNote(note.note)"></dd>
      </template>
    </dl>
  </WelcomeItem>
</template>
