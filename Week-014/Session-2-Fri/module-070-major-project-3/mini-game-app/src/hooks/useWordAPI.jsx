import { useEffect, useState, useContext } from "react";
import { GameObject } from "../context/GameContext";

export default function useWordAPI(randomWord) {
  let wordsJson;

  const [words, setWords] = useState([]);
  const { gameObject, setGameObject } = useContext(GameObject);

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
          "x-rapidapi-key": gameObject.apiKey,
          "x-rapidapi-host": "word-checker-api.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const list = result.found_words;
        if (list == undefined) {
          setGameObject((prev) => ({
            ...prev,
            apiError: true,
            apiErrorMsg: result.message,
          }));
          return;
        }
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
        setGameObject((prev) => ({
          ...prev,
          wordsLoaded: true,
        }));
      } catch (error) {
        console.error(error);
        setWords([]);
        setGameObject((prev) => ({
          ...prev,
          apiError: true,
          apiErrorMsg: error,
        }));
      }
    }
    wordsJson = fetchWords();
  }, [randomWord]);
  return words;
}
