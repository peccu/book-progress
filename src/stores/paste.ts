export default async () => {
  if (!navigator.clipboard) {
    // fallbackCopyTextToClipboard(text);
    alert("sorry, your browser not supported");
    return;
  }
  return navigator.clipboard.readText();
};
