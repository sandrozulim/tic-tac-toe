import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import type { components } from "../types/api.generated";
import { Link } from "react-router";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import useLogin from "../hooks/useLogin";

type LoginInput = components["schemas"]["LoginInput"];

export default function LoginPage() {
  const [form, setForm] = useState<LoginInput>({ username: "", password: "" });
  const { mutate, isPending, isError, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
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
                isPending || !form.username.trim() || !form.password.trim()
              }
            >
              Login
            </Button>

            {isError && (
              <ErrorMessage
                message={
                  error?.response?.data.errors?.[0]?.message || error?.message
                }
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
