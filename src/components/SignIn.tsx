"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import CustomButton from "./ui/CustomButton";
import { useRouter } from "next/navigation";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import Alert from "./Alert";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    displayAlert,
    state: { showAlert },
  } = useFeatureContext();

  const router = useRouter();

  const loginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (email && password) {
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      })
        .then((res) => {
          if (res?.ok) return router.back();
          if (res?.error) {
            return displayAlert(res.error, false);
          }
          return displayAlert("Error Occurred !", false);
        })
        .catch(() => {
          displayAlert("Error Occurred !", false);
        });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={loginSubmit}
      className="flex flex-col gap-4 max-w-md m-auto"
    >
      {showAlert && <Alert />}
      <h1 className=" text-2xl font-semibold text-center">Sign In</h1>
      <input
        name="email"
        required
        className="border outline-none px-3 py-2 rounded-lg"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email/username"
      />
      <input
        name="password"
        type="password"
        required
        className="border outline-none px-3 py-2 rounded-lg"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <CustomButton className=" py-2" type="submit" isLoading={loading}>
        Sign In
      </CustomButton>
      <p className="mt-2">
        Don&#8217;t have an account?
        <Link className="text-blue-400 border-b-2 ml-1" href="/sign-up">
          Sign-up
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
