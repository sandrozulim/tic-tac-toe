import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "../api/axios";
import type { ApiError } from "../types/types";
import type { components } from "../types/api.generated";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

type LoginInput = components["schemas"]["LoginInput"];
type LoginResponse = components["schemas"]["LoginOutput"];

export default function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation<LoginResponse, AxiosError<ApiError>, LoginInput>({
    mutationFn: async (data) => {
      const res = await api.post("/login/", data);
      return res.data;
    },
    onSuccess: (data) => {
      login(data.token, data.username);
      navigate("/");
    },
  });
}
