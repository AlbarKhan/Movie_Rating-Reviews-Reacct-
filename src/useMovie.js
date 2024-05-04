import { useState, useEffect } from "react";

const ApiKey = "5cd151cc";

export function useMovie(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovies() {
        try {
          if (query.length < 3) {
            setIsLoading("");
            return;
          }
          setIsLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${ApiKey}&s=${query}`,
            { signal: controller.signal }
          );
          if (!response.ok) throw new Error("Movie Not Found");

          const data = await response.json();
          if (data.Response === "False") throw new Error("Move Not Found !");
          // if(data.)
          // console.log(data.Search);
          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          // console.error(err.message);
          if (err.name !== "AbortError") {
            setLoadingMessage(err.message);
          }
        }
      }
      //   handleCloseMovie();
      getMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, loadingMessage };
}
