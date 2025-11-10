import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "../api/axios";
import type { ApiError } from "../types/types";
import type { components } from "../types/api.generated";

type Game = components["schemas"]["Game"];

export default function useGame(id: string) {
  return useQuery<Game, AxiosError<ApiError>>({
    queryKey: ["game", id],
    queryFn: async () => {
      const res = await api.get<Game>(`/games/${id}/`);
      return res.data;
    },
    // auto-refresh every 2 seconds
    refetchInterval: 2000,
  });
}
