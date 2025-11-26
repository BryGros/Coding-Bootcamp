import { useEffect, useState } from "react";

export default function useWordAPI(randomWord) {
  let wordsJson;

  const [words, setWords] = useState([]);

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
        const result = await response.json();
        let fullPasscodeList = [];
        for (const i in result) {
          if (Number(i) > 3) {
            const wordsArray = result[i];
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
