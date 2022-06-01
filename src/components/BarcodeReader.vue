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
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import Quagga from "quagga";
import { onMounted, ref, nextTick } from "vue";
import { validateIsbn } from "@/stores/books";

const emit = defineEmits<{
  (e: "setIsbn", isbn: string): void;
}>();
const quagga = ref<HTMLDivElement | null>(null);

const available =
  navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function";

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

const stop = () => {
  Quagga.offDetected(onDetected);
  Quagga.stop();
  quagga.value?.querySelector("video")?.remove();
  quagga.value?.querySelector("canvas")?.remove();
};

const onDetected = (data: { codeResult: { code: string } }) => {
  if (!validateIsbn(data.codeResult.code)) {
    console.log("code " + data.codeResult.code + "is not valid");
    return;
  }
  if (foundCodes.value.has(data.codeResult.code)) {
    const val = foundCodes.value.get(data.codeResult.code);
    val.count += 1;
    foundCodes.value.set(data.codeResult.code, val);
  } else {
    foundCodes.value.set(data.codeResult.code, { count: 1, fetched: false });
  }
  getCodeInfo(data.codeResult.code);
};

const getCodeInfo = (code: string) => {
  const val = foundCodes.value.get(code);
  const getinfoflag = val.fetched;
  // var getinfoflag = false;
  // for (let [key, value] of foundCodes.value) {
  //   // get data sorted
  //   if (value.count > 0) {
  //     getinfoflag = true;
  //   }
  // }
  if (getinfoflag) {
    // already fetched
    return;
  }
  console.log("get info...");
  resultCodeInfo.value = "Поиск: " + code;
  val.fetched = true;
  foundCodes.value.set(code, val);
  emit("setIsbn", code);
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
