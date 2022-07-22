<script setup lang="ts">
// https://observablehq.com/@d3/ridgeline-plot

import { onMounted } from "vue";
import * as d3 from "d3";
// import { storeToRefs } from "pinia";

import { useBooksState, type Book } from "@/stores/books";
import history from "./history";
import type { DateNSeries, Series } from "./history";

const booksstore = useBooksState();
const books = booksstore.sortedBooks;

onMounted(() => {
  const data: DateNSeries = history.dataByTimeline(d3, books);
  console.log("dataByTimeline", data);

  const overlap = 1;
  const height = data.series.length * 60;

  // set the dimensions and margins of the graph
  const margin = { top: 60, right: 8, bottom: 20, left: 80 };
  const width = window.innerWidth - margin.left - margin.right;
  // const height = 600 - margin.top - margin.bottom;

  const x = d3
    .scaleTime()
    .domain(d3.extent(data.dates) as [Date, Date])
    .range([margin.left, width - margin.right]);

  const trim = (name: string) => {
    return name.slice(0, 14) + (name.length > 14 ? "..." : "");
  };

  const y = d3
    .scalePoint()
    // .domain(data.series.map((d) => d.name))
    .domain(data.series.map((d) => trim(d.name)))
    .range([margin.top, height - margin.bottom]);

  const z = d3
    .scaleLinear()
    .domain([0, d3.max(data.series, (d) => d3.max(d.values)) as number])
    .nice()
    .range([0, -overlap * y.step()]);

  const area = d3
    .area()
    .curve(d3.curveBasis)
    .defined((d: number | any) => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y0(0)
    .y1((d: any, i: number): number => z(d));

  const line = area.lineY1();

  // append the svg object to the body of the page
  const svg = d3
    .select("#my_timeviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // xAxis
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    );

  // yAxis
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},1)`)
    .call(d3.axisLeft(y).tickSize(0).tickPadding(4));
  // .call((g) => g.select(".domain").remove());
  // .selectAll(".tick text")
  // .call(wrap, margin.left);

  const group = svg
    .append("g")
    .selectAll("g")
    .data(data.series)
    .join("g")
    .attr("transform", (d) => `translate(0,${(y(trim(d.name)) || 0) + 1})`);

  group
    .append("path")
    .attr("fill", "#69b3a2")
    .attr("d", (d: Series) => area(d.values as any));

  group
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("d", (d: Series) => line(d.values as any));
});

// function wrap(text, width) {
//   text.each(function () {
//     // debugger
//     var text = d3.select(this),
//       words = text.text().split("").reverse(),
//       word,
//       line = [],
//       lineNumber = 0,
//       lineHeight = 1.0, // ems
//       y = text.attr("y"),
//       dy = parseFloat(text.attr("dy")),
//       tspan = text
//         .text(null)
//         .append("tspan")
//         .attr("x", 0)
//         .attr("y", y)
//         .attr("dy", dy + "em");
//     while ((word = words.pop())) {
//       line.push(word);
//       tspan.text(line.join(""));
//       if (tspan.node().getComputedTextLength() > width) {
//         line.pop();
//         tspan.text(line.join(""));
//         line = [word];
//         if (lineNumber > 4) {
//           continue;
//         }
//         tspan = text
//           .append("tspan")
//           .attr("x", 0)
//           .attr("y", y)
//           .attr("dy", `${++lineNumber * lineHeight + dy}em`)
//           .text(word);
//       }
//     }
//   });
// }
</script>

<template>
  <div id="my_timeviz"></div>
</template>
