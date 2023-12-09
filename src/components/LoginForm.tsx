"use client";

import { signIn, useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import CustomButton from "./CustomButton";

const LoginForm = () => {
  const { status, data } = useSession();

  console.log(status);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const loginSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    if (email && password) {
      signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      }).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <form
      onSubmit={loginSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      <p>{data?.user.id}</p>
      <p>{data?.user.discourse_id}</p>
      <p>{data?.user.name}</p>
      <p>{data?.user.email}</p>
      <p>{data?.user.image}</p>
      <input
        name="email"
        type="email"
        className="border outline-none"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        name="password"
        type="password"
        className="border outline-none"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <CustomButton type="submit" isLoading={false}>
        Sign In
      </CustomButton>
    </form>
  );
};

export default LoginForm;
