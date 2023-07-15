import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Genre {
    id: number;
    name: string;
}

interface FetchGenresResponse {
    count: number;
    results: Genre[];
}

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoadnig] = useState(false)

  useEffect(() => {
    const controller = new AbortController();

    setLoadnig(true);
    apiClient
      .get<FetchGenresResponse>("/genres", { signal: controller.signal })
      .then((res) => {
        setGenres(res.data.results);
        setLoadnig(false)
    })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoadnig(false);
    });

    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;