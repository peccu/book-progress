<script setup lang="ts">
import { onMounted } from "vue";
import * as d3 from "d3";

onMounted(() => {
  // set the dimensions and margins of the graph
  const margin = { top: 60, right: 30, bottom: 20, left: 110 },
    width = 360 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //read data
  d3.csv(
    "https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv"
  ).then(function (data) {
    // Get the different categories and count them
    const categories = data.columns;
    const n = categories.length;

    // Add X axis
    const x = d3.scaleLinear().domain([-10, 140]).range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Create a Y scale for densities
    const y = d3.scaleLinear().domain([0, 0.4]).range([height, 0]);

    // Create the Y axis for names
    const yName = d3
      .scaleBand()
      .domain(categories)
      .range([0, height])
      .paddingInner(1);
    svg.append("g").call(d3.axisLeft(yName));

    // Compute kernel density estimation for each column:
    const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)); // increase this 40 for more accurate density.
    const allDensity = [];
    for (let i = 0; i < n; i++) {
      const key = categories[i];
      const density = kde(
        data.map(function (d) {
          return parseInt(d[key] || "0", 10);
        })
      );
      allDensity.push({ key: key, density: density });
    }

    // Add areas
    svg
      .selectAll("areas")
      .data(allDensity)
      .join("path")
      .attr("transform", function (d) {
        return `translate(0, ${(yName(d?.key)||0) - height})`;
      })
      .datum(function (d) {
        return d.density;
      })
      .attr("fill", "#69b3a2")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr(
        "d",
      "M10,60L40,90L60,10L190,10");/*
        d3
          .line()
          .curve(d3.curveBasis)
          .x(function (d) {
            return x(d[0]);
          })
          .y(function (d) {
            return y(d[1]);
          })
      );*/
  });

  type Kernel = (n: number) => number;
  // This is what I need to compute kernel density estimation
  const kernelDensityEstimator = (kernel: Kernel, X: number[]) => {
    return (V: number[]) => {
      return X.map((x: number) => {
        return [
          x,
          d3.mean(V, (v: number) => {
            return kernel(x - v);
          }),
        ];
      });
    };
  }
  const kernelEpanechnikov = (k: number) => {
    return (v: number) => {
      return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
    };
  }
});
</script>

<template>
  <div id="my_dataviz">ridge line</div>
</template>
