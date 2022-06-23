<script setup lang="ts">
import { onMounted } from "vue";
import * as d3 from "d3";
// import { storeToRefs } from "pinia";
import { useBooksState, type Book } from "@/stores/books";
import history from "./history";

const booksstore = useBooksState();
const books = booksstore.sortedBooks;

onMounted(() => {
  // set the dimensions and margins of the graph
  const margin = { top: 60, right: 10, bottom: 36, left: 10 },
    width = window.innerWidth - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Add X axis
  const x = d3.scaleLinear().domain([-10, 140]).range([0, width]);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height + 16})`)
    .call(d3.axisBottom(x));

  // Create a Y scale for densities
  const y = d3.scaleLinear().domain([0, 0.4]).range([height, 0]);

  type Density = [number, number][];
  type Kde = (V: number[]) => Density;
  type DensityWithKey = { key: string; density: Density };
  type Kernel = (n: number) => number;
  type KdeGenerator = (kernel: Kernel, X: number[]) => Kde;

  // This is what I need to compute kernel density estimation
  const kernelDensityEstimator: KdeGenerator = (kernel, X) => {
    return (V: number[]) => {
      return X.map((x: number) => {
        return [
          x,
          d3.mean(V, (v: number) => {
            return kernel(x - v);
          }),
        ] as [number, number];
      }) as [number, number][];
    };
  };
  const kernelEpanechnikov: (k: number) => Kernel = (k) => {
    return (v: number) => {
      return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
    };
  };

  // Compute kernel density estimation for each column
  const kde: Kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)); // increase this 40 for more accurate density.

  type HistoryPoint = { date: Date; val: number; bin: number };
  type Histories = { key: string; d: HistoryPoint[] };
  const render = function (data: Histories[]) {
    // Get the different categories and count them
    const categories: string[] = data.map((e) => e.key);
    const n = categories.length;

    // const minDate = d3.min(data, function (d) {
    //   return d3.min(d.d, function (e) {
    //     return e.date;
    //   });
    // });
    // minDate.setDate(minDate.getDate() - 1);
    // var maxDate = d3.max(data, function (d) {
    //   return d3.max(d.d, function (e) {
    //     return e.date;
    //   });
    // });

    // Create the Y axis for names
    const yName = d3
      .scaleBand()
      .domain(categories)
      .range([0, height])
      .paddingInner(1);

    svg
      .append("g")
      .attr("transform", `translate(0, 10)`)
      .call(d3.axisRight(yName).tickSize(0));

    const allDensity: DensityWithKey[] = [];
    for (let i = 0; i < n; i++) {
      const key = data[i].key;
      // const categoryData = data.map((d) => parseInt(d[key] || "0", 10));
      const categoryData = data[i].d.map((e) => e.val);
      const density: Density = kde(categoryData);
      allDensity.push({ key: key, density: density });
    }

    const lineFn = d3
      .line<[number, number]>()
      .curve(d3.curveBasis)
      .x(function (d: [number, number]) {
        return x(d[0]);
      })
      .y(function (d: [number, number]) {
        return y(d[1]);
      });

    // Add areas
    svg
      .selectAll("areas")
      .data(allDensity)
      .join("path")
      .attr(
        "transform",
        (d) => `translate(0, ${(yName(d?.key) || 0) - height})`
      )
      .datum((d: DensityWithKey): Density => d.density)
      .attr("fill", "#69b3a2")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("d", lineFn);
  };
  render(history.data(books));
});
</script>

<template>
  <div id="my_dataviz"></div>
</template>
