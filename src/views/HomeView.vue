<script setup lang="ts">
import MyBooks from "@/components/book/MyBooks.vue";
</script>

<template>
  <div class="about">
    <MyBooks />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
