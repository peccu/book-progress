<script setup lang="ts">
import { onMounted } from "vue";
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import * as d3 from "d3";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";

// import { storeToRefs } from "pinia";

import { useBooksState, type Book } from "@/stores/books";
import history from "./history";
import type { DateNSeries, Series } from "./history";

const booksstore = useBooksState();
const books = booksstore.sortedBooks;
const histvalues = history.dataMerged(d3, books);
</script>

<template>
  <div id="my_calendarheatmap">
    <CalendarHeatmap :values="histvalues" :end-date="new Date()" />
  </div>
  <pre
    >{{ histvalues }}
</pre
  >
</template>

<style>
.vch__container .vch__legend {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vch__container .vch__external-legend-wrapper {
  margin: 0 8px;
}

svg.vch__wrapper {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 10px;
  width: 100%;
}

svg.vch__wrapper .vch__months__labels__wrapper text.vch__month__label {
  font-size: 10px;
}

svg.vch__wrapper .vch__days__labels__wrapper text.vch__day__label,
svg.vch__wrapper .vch__legend__wrapper text {
  font-size: 9px;
}

svg.vch__wrapper text.vch__month__label,
svg.vch__wrapper text.vch__day__label,
svg.vch__wrapper .vch__legend__wrapper text {
  fill: #767676;
}

svg.vch__wrapper rect.vch__day__square:hover {
  stroke: #555;
  stroke-width: 2px;
  paint-order: stroke;
}

svg.vch__wrapper rect.vch__day__square:focus {
  outline: none;
}
</style>
