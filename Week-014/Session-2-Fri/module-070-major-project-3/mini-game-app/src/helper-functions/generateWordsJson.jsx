import { useEffect } from "react";

export default function generateWordsJson({ randomWord }) {
  let wordsJson;
  useEffect(() => {
    async function fetchWords() {
      const url = `https://word-checker-api.p.rapidapi.com/v1/tools/anagram-solver/${randomWord}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "5b3d88e7dmshdd25b7c1b5bc34fp166924jsn0420927128263",
          "x-rapidapi-host": "word-checker-api.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    }
    wordsJson = fetchWords();
  }, []);
  return wordsJson;
}
