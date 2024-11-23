// https://web.dev/read-files/
export default (
  event: Event,
  setResult: (result: string) => void,
  setProgress: (percent: number) => void,
) => {
  const target = event.target as HTMLInputElement;
  const file = (target.files as FileList)[0];
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    const result: string = (event.target as FileReader).result as string;
    setResult(result);
  });
  reader.addEventListener("progress", (event: ProgressEvent) => {
    if (!(event.loaded && event.total)) {
      return;
    }
    const percent = (event.loaded / event.total) * 100;
    setProgress(percent);
  });
  reader.readAsText(file);
};
