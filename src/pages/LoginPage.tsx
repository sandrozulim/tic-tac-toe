import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";
import { ErrorMessage } from "../components/ErrorMessage";
import { useAuth } from "../context/AuthContext";

import { type AxiosError } from "axios";
import type { ApiError } from "../api/api-types";
import type { components } from "../api/api.generated";
import { Link, useNavigate } from "react-router";

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
        login(data.token);
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
    <div className="flex justify-center items-center">
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
          <div>
            <label className="text-gray-500 text-sm" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 "
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              autoFocus
              required
            />
          </div>

          <div>
            <label className="text-gray-500 text-sm" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 "
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={4}
            />
          </div>

          <div>
            <button
              className="bg-black text-white w-full py-2 rounded-lg hover:cursor-pointer hover:bg-neutral-800 active:bg-neutral-800 transition-colors disabled:bg-neutral-400"
              type="submit"
              disabled={
                mutation.isPending ||
                !form.username.trim() ||
                !form.password.trim()
              }
            >
              {mutation.isPending ? "..." : "Login"}
            </button>

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
