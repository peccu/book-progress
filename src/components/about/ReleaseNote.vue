<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
const notes = [
  // {when: "", note: []},
  {
    when: "2022/12/14",
    note: [
      "ボタンと表紙画像を上に移動",
      "履歴更新時に更新日時表示が更新されなかった問題を修正",
      "履歴編集機能を追加",
    ],
  },
  {
    when: "2022/11/25",
    note: "履歴画面に遷移したときに一番上にスクロールするように変更",
  },
  {
    when: "2022/11/20",
    note: "ホーム画面に追加するのを促すメッセージを追加",
  },
  {
    when: "2022/11/05",
    note: ["履歴画面作成"],
  },
  {
    when: "2022/11/04",
    note: ["一覧から履歴画面に遷移できるようにした(履歴画面は工事中)"],
  },
  { when: "2022/07/23", note: ["カレンダーヒストグラムを追加"] },
  {
    when: "2022/06/23",
    note: [
      "インポート用にクリップボードからペーストするボタンを用意",
      "グラフの幅をウィンドウサイズに合わせるよう変更",
    ],
  },
  {
    when: "2022/6/16",
    note: ["インポートした後に本を追加するとIDが重複する問題を修正"],
  },
  { when: "2022/06/14", note: ["グラフのx軸が日付になるように修正"] },
  {
    when: "2022/6/9",
    note: ["グラフをサンプルから実際のデータを使うように変更"],
  },
  {
    when: "2022/6/7",
    note: [
      "統計情報表示用にサンプルグラフを追加",
      "aboutページに作った背景のようなものを記載",
    ],
  },
  {
    when: "2022/6/6",
    note: [
      "編集画面からカメラ機能を落として新規登録画面だけにカメラ機能を入れ、軽量化した",
    ],
  },
  {
    when: "2022/6/4",
    note: [
      "faviconなどアイコンを設定",
      "進捗更新時に前回と同じ進捗なら上書きしない(履歴を増やさない)ようにした",
    ],
  },
  {
    when: "2022/6/3",
    note: [
      "Add to Home Screen対応",
      "Import/Exportのテキストエリアのサイズ変更、コピーボタン追加",
      "進捗入力欄を上に移動",
      "detals summaryのアイコンをデフォルトから本の絵文字に変更",
      "404ページ作成",
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
