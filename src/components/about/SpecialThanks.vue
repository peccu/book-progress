<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import ToolingIcon from "./icons/IconTooling.vue";
// {desc: "", link: ""},
const links = [
  { desc: "Vue 3", link: "framework" },
  { desc: "Glitch", link: "development" },
  { desc: "Netlify", link: "hosting" },
  { desc: "Cloudinary", link: "host sharing image" },
  { desc: "QuaggaJS", link: "Barcode reader" },
  { desc: "OpenBD", link: "ISBN search" },
  {
    desc: "Flaticon",
    link: {
      href: "https://www.flaticon.com/free-icons/book",
      title: "Book icons created by mikan933",
    },
  },
  {
    desc: "Ridge Line",
    link: {
      href: "https://d3-graph-gallery.com/graph/ridgeline_basic.html",
      title: "Basic ridgeline plot in d3.js",
    },
  },
  {
    desc: "Ridge Line with time scale",
    link: {
      href: "https://observablehq.com/@d3/ridgeline-plot",
      title: "Ridgeline Plot / D3 / Observable",
    },
  },
  {
    desc: "generate og image",
    link: {
      href: "https://michaelheap.com/netlify-function-lambda-return-image/",
      title: "Return an image from Netlify functions",
    },
  },
  {
    desc: "og image using cloudinary",
    link: {
      href: "https://urre.me/writings/dynamic-open-graph-images/",
      title: "Dynamic Open Graph Images</a>",
    },
  },
  {
    desc: "Tips.",
    link: {
      href: "https://stackoverflow.com/a/39715278/514411",
      title: "date floor",
    },
  },
];
const formatLink = (link: string | {href: string, title: string}): string => {
  if (typeof link === "string") {
    return link;
  }
  return `<a href="${link.href}" target="_blank">${link.title}</a>`;
};
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Special Thanks</template>

    <dl>
      <template v-for="(link, i) in links" :key="i">
        <dt class="desc">{{ link.desc }}</dt>
        <dd class="link" v-html="formatLink(link.link)"></dd>
      </template>
    </dl>
  </WelcomeItem>
</template>
