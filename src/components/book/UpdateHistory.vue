<script setup lang="ts">
import { useBooksState } from "@/stores/books";

const props = defineProps({
  bookid: Number,
  historyid: Number,
  date: Number,
});

let dateObj = new Date();
if (typeof props.date !== "undefined") {
  dateObj = new Date(props.date);
}
let date = dateObj.toLocaleDateString("en-CA");
let time = dateObj.toLocaleTimeString("it-IT");

const booksstore = useBooksState();
const updateHistory = (_date: string, _time: string) => {
  if (
    !props ||
    props.bookid == undefined ||
    props.historyid == undefined ||
    props.date == undefined
  ) {
    return;
  }
  const newdate = Date.parse(`${_date} ${_time}`);
  console.log(`${date} ${time} -> ${_date} ${_time}`);
  booksstore.updateHistory(props.bookid, props.historyid, newdate);
  const updated = booksstore.getBookById(props.bookid.toString());
  if (!updated) {
    alert("update failed");
    return;
  }
};
</script>

<template>
  <div>
    <input type="date" v-model="date" />
    <input type="time" v-model="time" />
    <button @click.stop.prevent="updateHistory(date, time)">
      UpdateHistory
    </button>
  </div>
</template>

<style scoped>
input {
  margin: 0 0.3em;
}
</style>
