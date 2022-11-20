<script setup lang="ts">
type SafariNavigator = Navigator & {readonly standalone: Boolean};
const needToAddToHomeScreen = () => {
  return (
    "standalone" in window.navigator && (window.navigator as SafariNavigator).standalone !== true
  );
};
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div v-if="needToAddToHomeScreen()">You need to add to home screen for permanently storing books and progress data.</div>
    <div v-else>Thank you for adding to home screen.</div>
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
