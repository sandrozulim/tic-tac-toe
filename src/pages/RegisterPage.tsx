import { useState } from "react";
import { Link } from "react-router";
import type { components } from "../types/api.generated";
import { ErrorMessage } from "../components/ErrorMessage";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import useRegister from "../hooks/useRegister";

type RegisterInput = components["schemas"]["RegisterInput"];

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterInput>({
    username: "",
    password: "",
  });
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { mutate, isPending, isError, error } = useRegister();

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
    mutate(form);
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="w-full max-w-xl mx-auto p-4 rounded-lg border border-gray-200 shadow-lg">
        <h2 className="text-3xl text-center font-semibold text-black">
          Register
        </h2>
        <Link
          className="inline-block text-gray-600 mt-4 text-sm text-center w-full underline"
          to="/login"
        >
          Already have an account?
          <span className="font-medium"> Login here</span>
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
            minLength={4}
            required
          />
          <TextInput
            type="password"
            label="Repeat Password"
            id="repeat-password"
            name="repeat-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            minLength={4}
            required
          />
          <div>
            <Button
              type="submit"
              disabled={
                isPending ||
                !form.username.trim() ||
                !form.password.trim() ||
                !repeatPassword.trim()
              }
            >
              Register
            </Button>
            {(isError || passwordError) && (
              <ErrorMessage
                message={
                  passwordError ||
                  error?.response?.data.errors?.[0]?.message ||
                  error?.message ||
                  "Something went wrong"
                }
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
