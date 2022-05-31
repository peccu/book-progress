<script setup lang="ts">
const props = defineProps({
  cover: String,
});
</script>
<template>
  <div v-if="cover !== ''" class="cover">
    <img :src="cover" />
  </div>
</template>

<style scoped>
.cover {
  max-width: 100%;
}
</style>
