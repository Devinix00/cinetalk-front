import { useEffect } from "react";

import { searchAPIs } from "@/services/search/searchAPIs";
import useSearchMovieTitlesStore from "@/stores/useSearchMovieTitlesStore";

import useDebounce from "./useDebounce";

export default function useSearchMovies(value: string) {
  const debouncedSearchTerm = useDebounce(value, 200);
  const { setMovieTitles } = useSearchMovieTitlesStore();

  useEffect(() => {
    const searchMovies = async () => {
      const { data } = await searchAPIs.searchMovies(debouncedSearchTerm);

      const movieTitlesArr = data?.map((movie: string) => movie).slice(0, 10);

      setMovieTitles(movieTitlesArr);
    };

    if (debouncedSearchTerm) {
      searchMovies();
    }
  }, [debouncedSearchTerm, setMovieTitles]);
}
