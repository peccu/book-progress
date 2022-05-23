<script lang="ts">
export default {
  props: ["book"],
  data() {
    return {
      keys: ["authors", "publisher", "pages"],
    };
  },
  book: {
    title: "The Book 1",
    authors: ["john"],
    publisher: "AB Books",
    pages: 339,
    progress: { type: "page", progress: 24, date: new Date(2022, 4, 18) },
    history: [{ type: "%", progress: 13, date: new Date(2022, 4, 3) }],
  },
};
</script>
<template>
  <p>{{ book.title }}</p>
  <dl>
    <dt>Authors:</dt>
    <dd>
      {{ book.authors }}
    </dd>
    <dt>Publisher:</dt>
    <dd>
      {{ book.publisher }}
    </dd>
    <dt>Pages:</dt>
    <dd>
      {{ book.pages === null ? "" : book.pages }}
    </dd>
  </dl>
</template>

<style scoped>
p,
dt {
  font-weight: bold;
}

dl,
dd {
  font-size: 0.9rem;
}

dd {
  margin-bottom: 1em;
}
</style>
