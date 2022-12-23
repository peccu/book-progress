import { ref, type Ref } from "vue";
import paste from "@/stores/paste";

export const useBooksExport = (books: string) => {
  const booksExport: Ref<string> = ref(
    JSON.stringify(JSON.parse(books), null, 2),
  );
  const pasteBooks = async () => {
    booksExport.value = (await paste()) as string;
  };

  const setResult = (result: string) => {
    booksExport.value = result;
  };
  return {
    booksExport,
    pasteBooks,
    setResult,
  };
};
