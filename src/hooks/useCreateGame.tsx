import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "../api/axios";
import type { ApiError } from "../types/types";
import { useNavigate } from "react-router";
import type { paths } from "../types/api.generated";

type GameMutationResponse =
  paths["/games/"]["post"]["responses"]["200"]["content"]["application/json"];

export default function useCreateGame() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<GameMutationResponse, AxiosError<ApiError>>({
    mutationFn: async () => {
      const res = await api.post("/games/");
      return res.data;
    },
    onSuccess: (newGame) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      navigate(`/games/${newGame.id}`);
    },
  });
}
