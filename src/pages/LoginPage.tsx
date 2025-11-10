import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";
import { ErrorMessage } from "../components/ErrorMessage";
import { useAuth } from "../context/AuthContext";

import { type AxiosError } from "axios";
import type { ApiError } from "../types/types";
import type { components } from "../types/api.generated";
import { Link, useNavigate } from "react-router";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";

type LoginInput = components["schemas"]["LoginInput"];
type LoginResponse = components["schemas"]["LoginOutput"];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginInput>({ username: "", password: "" });

  const mutation = useMutation<LoginResponse, AxiosError<ApiError>, LoginInput>(
    {
      mutationFn: async (data) => {
        const res = await api.post("/login/", data);
        return res.data;
      },
      onSuccess: (data) => {
        login(data.token, data.username);
        navigate("/");
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="w-full max-w-xl mx-auto p-4 rounded-lg border border-gray-200 shadow-lg">
        <h2 className="text-3xl text-center font-semibold text-black">Login</h2>
        <Link
          className="inline-block text-gray-600 mt-4 text-sm text-center w-full underline"
          to="/register"
        >
          Don&apos;t have an account?
          <span className="font-medium"> Register here</span>
        </Link>
        <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoFocus
            required
          />
          <TextInput
            type="password"
            label="Password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={4}
          />
          <div>
            <Button
              className="mt-4"
              type="submit"
              disabled={
                mutation.isPending ||
                !form.username.trim() ||
                !form.password.trim()
              }
            >
              Login
            </Button>

            {mutation.isError && (
              <ErrorMessage
                message={
                  mutation.error?.response?.data.errors?.[0]?.message ||
                  mutation.error?.message
                }
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
