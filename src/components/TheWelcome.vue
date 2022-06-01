<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Release notes</template>

    <ul>
      <li>2022/6/1 : リリースノート追加</li>
      <li>
        2022/5/29ごろ :
        ISBNで検索、最近進捗更新したものが上に来るようにソート、バーコードリーダー追加
      </li>
      <li>
        2022/5/25ごろ :
        本の登録、進捗の登録、インポートエクスポートができるようになる。
      </li>
      <li>
        2022/5中旬 : localStorageでいいやん。と気づき開発開始。ちょうどvue
        3とviteの組み合わせも整っててタイミングよかった。
      </li>
    </ul>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>特徴</template>

    <ul>
      <li>
        バーコードを読み取ってデータが見つかれば本の登録を省力化できます(New
        Book)
      </li>
      <li>読書の進捗を日々記録できます(Home)</li>
      <li>
        データはブラウザ内(localStorage)に保存され、どこにも送信されません(インポートエクスポート画面で内容の確認、上書きが可能です)
      </li>
      <li>Google Analyticsでアクセス数は記録しています</li>
      <li>
        将来的に…
        <ul>
          <li>完了ステータスの記録</li>
          <li>進捗グラフ</li>
          <li>まとめて登録</li>
          <li>一覧のフィルタ機能</li>
        </ul>
      </li>
    </ul>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Special Thanks</template>
    <ul>
      <li>Vue 3</li>
      <li>glitch.com</li>
      <li>netlify</li>
      <li>Quagga</li>
      <li>OpenBD</li>
    </ul>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a target="_blank" href="https://pinia.vuejs.org/">Pinia</a>,
    <a target="_blank" href="https://router.vuejs.org/">Vue Router</a>,
    <a target="_blank" href="https://test-utils.vuejs.org/">Vue Test Utils</a>,
    and
    <a target="_blank" href="https://github.com/vuejs/devtools">Vue Dev Tools</a
    >. If you need more resources, we suggest paying
    <a target="_blank" href="https://github.com/vuejs/awesome-vue"
      >Awesome Vue</a
    >
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a target="_blank" href="https://chat.vuejs.org">Vue Land</a>, our official
    Discord server, or
    <a target="_blank" href="https://stackoverflow.com/questions/tagged/vue.js"
      >StackOverflow</a
    >. You should also subscribe to
    <a target="_blank" href="https://news.vuejs.org">our mailing list</a> and
    follow the official
    <a target="_blank" href="https://twitter.com/vuejs">@vuejs</a>
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its
    sustainability. You can help us by
    <a target="_blank" href="https://vuejs.org/sponsor/">becoming a sponsor</a>.
  </WelcomeItem>
</template>
