<script setup lang="ts">
import { useBooksState, type Book } from "@/stores/books";

const props = defineProps({
  bookid: Number,
  historyid: Number,
  date: Number,
});

let date = new Date(props.date).toLocaleDateString("en-CA");
let time = new Date(props.date).toLocaleTimeString("it-IT");
let message = "";

const booksstore = useBooksState();
const updateProgress = () => {
  console.log(
    `book id: ${props.bookid}, history id: ${props.historyid}, date: ${props.date}`
  );
  if (
    !props ||
    props.bookid == undefined ||
    props.historyid == undefined ||
    props.date == undefined
  ) {
    return;
  }
  // TODO impl update history function in book store
  const newdate = Date.parse(`${date} ${time}`);
  console.log(`from ${props.date} to ${newdate}`);
  // booksstore.updateHistory(props.bookid,  props.historyid, newdate);
  const updated = booksstore.getBookById(props.bookid.toString());
  if (!updated) {
    message = "update failed";
    return;
  }
  message = "update success";
};
</script>
<script lang="ts">
// export default {
//   mounted() {
//     this.$refs.input.focus();
//   },
// };
</script>
<template>
  <form @submit="updateProgress">
    <input type="date" v-model="date" />
    <input type="time" v-model="time" />
    <button @click.stop.prevent="updateProgress()">UpdateHistory</button>
    {{ message }}
  </form>
</template>

<style scoped>
form {
  margin: 0;
  padding: 0;
}
input[type="text"] {
  width: 3em;
}
.field {
  margin: 0 0.3em;
}
input {
  margin: 0 0.3em;
}
</style>
