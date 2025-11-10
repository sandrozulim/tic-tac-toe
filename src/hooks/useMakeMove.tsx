import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "../api/axios";
import type { ApiError } from "../types/types";
import type { paths, components } from "../types/api.generated";

type Move = components["schemas"]["MakeMove"];
type MakeMoveResponse =
  paths["/games/{id}/move/"]["post"]["responses"]["200"]["content"];

export default function useMakeMove(gameId: string) {
  const queryClient = useQueryClient();

  return useMutation<MakeMoveResponse, AxiosError<ApiError>, Move>({
    mutationFn: async (move: Move) => {
      await api.post(`/games/${gameId}/move/`, move);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["game", gameId],
        refetchType: "active",
      });
    },
  });
}
