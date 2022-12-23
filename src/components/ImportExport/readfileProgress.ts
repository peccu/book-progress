import { ref, type Ref } from "vue";

export const useProgress = () => {
  const progress: Ref<number> = ref(0);

  const setProgress = (percent: number) => {
    progress.value = Math.round(percent);
    console.log(`Progress: ${Math.round(percent)}`);
  };

  return { progress, setProgress };
};
