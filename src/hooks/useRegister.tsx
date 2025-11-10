import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "../api/axios";
import type { ApiError } from "../types/types";
import type { components } from "../types/api.generated";
import { useNavigate } from "react-router";

type RegisterInput = components["schemas"]["RegisterInput"];
type RegisterResponse = components["schemas"]["User"];

export default function useRegister() {
  const navigate = useNavigate();
  return useMutation<RegisterResponse, AxiosError<ApiError>, RegisterInput>({
    mutationFn: async (data) => {
      const res = await api.post("/register/", data);
      return res.data;
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
}
