<script lang="ts">
export default {
  props: ["book"],
};
</script>
<template>
  <template v-if="book.progress === null">
    <progress max="100" value="0">0%</progress>
    0%
  </template>
  <template v-else-if="book.progress.type == 'page'">
    <progress
      :id="'book' + book.id"
      :max="book.pages"
      :value="book.progress.progress"
    >
      {{ book.progress.progress }}{{ book.progress.type }}
    </progress>
    {{ book.progress.progress }}p / {{ book.pages }}p({{
      Math.round((100 * book.progress.progress) / book.pages)
    }}%)
  </template>
  <template v-else-if="book.progress.type == '%'">
    <progress :id="'book' + book.id" max="100" :value="book.progress.progress">
      {{ book.progress.progress }}{{ book.progress.type }}
    </progress>
    {{ book.progress.progress }}{{ book.progress.type }}
  </template>
  <template v-else>
    <progress :id="'book' + book.id" max="100" :value="book.progress.progress">
      {{ book.progress.progress }}{{ book.progress.type }}
    </progress>
    {{ book.progress.progress }}{{ book.progress.type }}_
  </template>
</template>

<style scoped>
progress {
  margin-left: 0.5em;
}
</style>
