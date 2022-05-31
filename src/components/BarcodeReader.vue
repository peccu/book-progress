<template>
  <div v-if="available" class="scanner_wrapper">
    <button @click="stop">Stop</button>
    <button @click="restart">Restart</button>

    <div ref="quagga" class="camera" />
    <!--<p>{{ resultCodeInfo }}</p>-->
    <p>{{ resultcode }}</p>

    <p>{{ foundCodes }}</p>

    <pre v-if="data && false">
      {{ data }}
    </pre>
  </div>
  <div v-else>
    Your browser may not supports camera. Please input ISBN by hands.
  </div>
</template>

<script setup lang="ts">
// TODO style and script for bounding box https://codepen.io/peccu/pen/rNJdrxe
// based on https://codesandbox.io/s/00yov51r2w?file=/components/Hello.vue
  // @ts-ignore
import Quagga from "quagga";

import { onMounted, ref, nextTick } from "vue";
const emit = defineEmits<{
  (e: "setIsbn", isbn: string): void;
}>();
const quagga = ref<HTMLDivElement | null>(null);

const available =
  navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function";

const validate = (code: string) => {
  // multiply by 3 for even numbers and sum them up and mod 10
  // it should be 0
  // ref. https://mathsuke.jp/isbncode/
  return (
    code.slice(0, 3) === "978" &&
    code
      .split("")
      .map((e: string, i) => parseInt(e, 10) * [1, 3][i % 2])
      .reduce((a, b) => a + b) %
      10 ===
      0
  );
};

const data = ref(null);
const resultcode = ref("-");
const resultCodeInfo = ref("-");
const foundCodes = ref(new Map());


const restart = () => {
  Quagga.init(
    {
      numOfWorkers: 4,
      frequency: 10,
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: quagga.value,
        constraints: {
          width: 200,
          height: document.querySelector("body")?.clientWidth,
          deviceId: 0,
          facingMode: "environment",
        },
        area: {
          top: "0%",
          right: "0%",
          left: "0%",
          bottom: "0%",
        },
      },
      debug: true,
      locator: {
        halfSample: true,
        patchSize: "medium", // x-small, small, medium, large, x-large
        debug: {
          showCanvas: true,
          showPatches: true,
          showFoundPatches: true,
          showSkeleton: true,
          showLabels: true,
          showPatchLabels: true,
          showRemainingPatchLabels: true,
          boxFromPatches: {
            showTransformed: true,
            showTransformedBox: true,
            showBB: true,
          },
        },
      },

      locate: true,

      decoder: {
        readers: ["ean_reader"],
      },
    },
    () => start()
  );
};
onMounted(() => {
  nextTick(() => restart());
});


const start = () => {
  Quagga.onDetected(onDetected);
  Quagga.start();
  console.log("Quagga started!");
};

const onDetected = (data: { codeResult: { code: string } }) => {
  if (!validate(data.codeResult.code)) {
    return;
  }
  // this.data = data;
  if (foundCodes.value.has(data.codeResult.code)) {
    const val = foundCodes.value.get(data.codeResult.code);
    foundCodes.value.set(data.codeResult.code, val + 1);
  } else {
    foundCodes.value.set(data.codeResult.code, 1);
  }
  getCodeInfo(data.codeResult.code);
};

const stop = () => {
  Quagga.offDetected(onDetected);
  Quagga.stop();
  quagga.value?.querySelector("video")?.remove();
  quagga.value?.querySelector("canvas")?.remove();
};

const getCodeInfo = (code: string) => {
  var getinfoflag = false;
  for (let [key, value] of foundCodes.value) {
    // get data sorted
    if (value > 0) {
      getinfoflag = true;
    }
  }

  //console.log('getinfoflag='+ getinfoflag + 'resultCodeInfo=' + this.resultCodeInfo);
  if (getinfoflag && resultCodeInfo.value == "-") {
    console.log("get info...");
    resultCodeInfo.value = "Поиск: " + code;
    emit("setIsbn", code);
  }
};
</script>

<style>
.scanner-wrapper {
  width: 100%;
  margin: 0;
  padding: 0;
}
.camera {
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 200px;
  display: block;
}
</style>
