<script setup lang="ts">
import { needToAddToHomeScreen } from "@/stores/standalone";
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div v-if="needToAddToHomeScreen()">
      デモモード : ホーム画面に追加せずに利用する場合は1週間以内に再度アクセスしてください。
      1週間アクセスがないとデータが消えます(iOS Safariの仕様)。
      ぜひ共有メニューからホーム画面に追加してご利用ください。
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  margin-bottom: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
