<script lang="ts">
export default {
  props: ["book"],
  data() {
    return {
      keys: ["authors", "publisher", "pages"],
    };
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
    <dt>ISBN:</dt>
    <dd>
      {{ book.isbn === null ? "" : book.isbn }}
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
