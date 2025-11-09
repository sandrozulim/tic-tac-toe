import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { api } from "../api/axios";
import type { components } from "../api/api.generated";
import { type AxiosError } from "axios";
import { ErrorMessage } from "../components/ErrorMessage";
import type { ApiError } from "../api/api-types";

type RegisterInput = components["schemas"]["RegisterInput"];
type RegisterResponse = components["schemas"]["User"];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterInput>({
    username: "",
    password: "",
  });
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ApiError>,
    RegisterInput
  >({
    mutationFn: async (data) => {
      const res = await api.post("/register/", data);
      return res.data;
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== repeatPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError(null);

    mutation.mutate(form);
  };

  return (
    <div className="">
      <h2 className="text-3xl text-center font-semibold text-black">
        Register
      </h2>

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
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
          <label className="text-gray-500 text-sm" htmlFor="repeat-password">
            Repeat Password
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 "
            type="password"
            id="repeat-password"
            name="repeat-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
            minLength={4}
          />
        </div>

        <div>
          <button
            className="bg-black text-white w-full py-2 rounded-lg hover:cursor-pointer hover:bg-neutral-800 active:bg-neutral-800 transition-colors disabled:bg-neutral-400 disabled:cursor-default"
            type="submit"
            disabled={
              mutation.isPending ||
              !form.username.trim() ||
              !form.password.trim() ||
              !repeatPassword.trim()
            }
          >
            {mutation.isPending ? "..." : "Register"}
          </button>

          {(mutation.isError || passwordError) && (
            <ErrorMessage
              message={
                passwordError ||
                mutation.error?.response?.data.errors?.[0]?.message ||
                mutation.error?.message ||
                "Something went wrong"
              }
            />
          )}
        </div>
      </form>
    </div>
  );
}
