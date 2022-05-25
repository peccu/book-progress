<script setup lang="ts">
const books = JSON.stringify(JSON.parse(localStorage.books),null, 2);
</script>

<template>
  <main>
    <textarea v-model="books" rows="40" cols="50"></textarea>
  </main>
</template>
