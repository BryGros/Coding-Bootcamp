import { useEffect, useState } from "react";

export default function useWordAPI(randomWord) {
  let wordsJson;

  const [words, setWords] = useState([]);

  useEffect(() => {
    // Doesn't run API if gameWord is not yet set
    if (!randomWord) {
      return;
    }

    console.log("useWordAPI fetching for: ", randomWord);

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
        const result = await response.json();
        const list = result.found_words;
        let fullPasscodeList = [];
        for (const lengthKey in list) {
          if (Number(lengthKey) > 3) {
            const wordsArray = list[lengthKey];
            wordsArray.forEach((element) => {
              fullPasscodeList.push(element);
            });
          }
        }
        setWords(fullPasscodeList);
      } catch (error) {
        console.error(error);
        setWords([]);
      }
    }
    wordsJson = fetchWords();
  }, [randomWord]);
  return words;
}
