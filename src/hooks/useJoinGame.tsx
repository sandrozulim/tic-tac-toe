import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { api } from "../api/axios";
import type { ApiError } from "../types/types";

export default function useJoinGame() {
  const navigate = useNavigate();

  return useMutation<unknown, AxiosError<ApiError>, number>({
    mutationFn: async (gameId: number) => {
      await api.post(`/games/${gameId}/join/`);
    },
    onSuccess: (_, gameId) => {
      navigate(`/games/${gameId}`);
    },
  });
}
