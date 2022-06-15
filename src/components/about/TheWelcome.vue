<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import ReleaseNote from "./ReleaseNote.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>コンセプト、背景、モチベーション</template>
    <p>
      読書習慣を身につけるために毎日15秒読むようにすれば、15秒以上読んでしまって継続しやすい。と何かで読んでからそれを気にしながら読書している。
    </p>
    <p>
      毎日の習慣が実践できていることを可視化してモチベーションを維持したい。
    </p>
    <p>
      既存のツールでは「読み始めた」「読み終わった」「読みたい」くらいのステータスしか保持できなかったり、いちいち画面遷移がありわずらわしい。
    </p>
    <p>
      またページ単位で保持できるものは和書に対応してないなど少しずつ好みに合わなかった。
    </p>
    <p>この辺りを動機に自分好みのツールを作り始めた。</p>
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
      <li>
        Google Analyticsでアクセス数を、New
        Relicでエラーやスループットなをは記録しています
      </li>
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

  <ReleaseNote></ReleaseNote>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Special Thanks</template>
    <ul>
      <li>Vue 3 : framework</li>
      <li>Glitch : development</li>
      <li>Netlify : hosting</li>
      <li>QuaggaJS : Barcode reader</li>
      <li>OpenBD : ISBN search</li>
      <li>
        Flaticon :
        <a
          href="https://www.flaticon.com/free-icons/book"
          title="book icons"
          target="_blank"
          >Book icons created by mikan933</a
        >
      </li>
      <li>
        Ridge Line :
        <a
          href="https://d3-graph-gallery.com/graph/ridgeline_basic.html"
          target="_blank"
          >Basic ridgeline plot in d3.js</a
        >
      </li>
      <li>
        Ridge Line with time scale :
        <a href="https://observablehq.com/@d3/ridgeline-plot" target="_blank"
          >Ridgeline Plot / D3 / Observable</a
        >
      </li>
      <li>
        some tips...:
        <ul>
          <li>
            <a
              href="https://stackoverflow.com/a/39715278/514411"
              target="_blank"
              >date floor</a
            >
          </li>
        </ul>
      </li>
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

<style scoped>
ul {
  padding: 1.5em;
}
</style>
