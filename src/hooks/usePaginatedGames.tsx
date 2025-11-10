import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/types";
import type { components } from "../types/api.generated";

type GameListResponse = components["schemas"]["PaginatedGameList"];

export function usePaginatedGames(
  key: string[],
  currentPage: number,
  limit = 10
) {
  const offset = (currentPage - 1) * limit;

  const query = useQuery<GameListResponse, AxiosError<ApiError>>({
    queryKey: [...key, currentPage],
    queryFn: async () => {
      const res = await api.get(`/games?limit=${limit}&offset=${offset}`);
      return res.data;
    },
    placeholderData: (prev) => prev,
  });

  const totalPages = query.data?.count
    ? Math.ceil(query.data.count / limit)
    : 1;

  return { ...query, totalPages };
}
