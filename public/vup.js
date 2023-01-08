let script = document.createElement("script");
script.src = `v.js?${new Date().getTime()}`;
document.head.appendChild(script);
setInterval(() => {
  console.log("t");
  document.head.removeChild(script);
  script = document.createElement("script");
  script.src = `v.js?${new Date().getTime()}`;
  document.head.appendChild(script);
}, 5000);
