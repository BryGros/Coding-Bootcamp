import { useEffect } from "react";

export default function useWordAPI(randomWord) {
  let wordsJson;
  let fullPasscodeList = [];
  useEffect(() => {
    async function fetchWords() {
      const url = `https://word-checker-api.p.rapidapi.com/v1/tools/anagram-solver/${randomWord}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "35b3d88e7dmshdd25b7c1b5bc34fp166924jsn042092712826",
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
    const results = wordsJson.found_words;
    for (const i in results) {
      if (Number(i) > 3) {
        const wordsArray = results[i];
        wordsArray.forEach((element) => {
          fullPasscodeList.push(element);
        });
      }
    }
  }, []);
  return fullPasscodeList;
}
