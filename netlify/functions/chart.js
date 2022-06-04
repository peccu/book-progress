import Chart from "chart.js";
const myChart = new Chart(document.getElementById("chart").getContext("2d"), {
  type: "horizontalBar",
  data: {
    labels: ["One", "Two", "Three", "Four", "Five", "Six"],
    datasets: [
      {
        label: "My data",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  },
});

// Get the chart's base64 image string
var image = myChart.toBase64Image();
// console.log(image);

exports.handler = function (event, context) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
    },
    body: image, // buffer.toString("base64"),
    isBase64Encoded: true,
  };
};
