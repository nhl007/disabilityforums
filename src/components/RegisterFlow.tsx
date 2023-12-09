"use client";

import { FormEvent, useState } from "react";

const RegisterFlow = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const registerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={registerSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto"
      >
        <input
          name="name"
          type="text"
          className="border outline-none"
          onChange={(e) => setName(e.target.value)}
          placeholder="user name"
        />
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default RegisterFlow;
