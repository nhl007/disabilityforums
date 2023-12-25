"use client";

import { FormEvent, useState } from "react";
import CustomButton from "./ui/CustomButton";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import Alert from "./Alert";
import Link from "next/link";
import Select from "react-select";
import { accountTypeOptions } from "@/constants/constants";

const SignUp = () => {
  const [type, setType] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [username, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    displayAlert,
    state: { showAlert },
  } = useFeatureContext();

  const registerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(type);
    if (password?.length! < 10) {
      setLoading(false);
      return displayAlert(
        "Password must be at least 10 characters long!",
        false
      );
    }
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          username,
          type,
        }),
      });
      if (response.status === 200) {
        displayAlert("Success! Redirecting...", true);
        await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        })
          .then((res) => {
            if (res?.ok) return router.back();
            if (res?.error) displayAlert(res.error, false);
          })
          .catch((e) => {
            displayAlert("Error Ocurred!", false);
          });
      } else {
        const data = await response.json();
        displayAlert(data, false);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        displayAlert(error.message, false);
      } else {
        displayAlert("Error Ocurred!", false);
      }
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={registerSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      {showAlert && <Alert />}
      <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
      <Select
        id="accountType"
        required
        instanceId="accountType"
        name="accountType"
        options={accountTypeOptions}
        className="w-full h-auto text-base"
        onChange={(val) => {
          setType(val?.value!);
        }}
        isSearchable={true}
        placeholder="Choose Account Type"
      />
      <input
        name="name"
        type="text"
        required
        className="border outline-none px-3 py-2 rounded-lg"
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        name="username"
        type="text"
        required
        className="border outline-none px-3 py-2 rounded-lg"
        onChange={(e) => setUserName(e.target.value)}
        placeholder="username"
      />
      <input
        name="email"
        type="email"
        required
        className="border outline-none px-3 py-2 rounded-lg"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
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
        Register
      </CustomButton>
      <p className="mt-2 ">
        Already have an account?
        <Link className="text-blue-400 border-b-2 ml-1" href="/sign-in">
          Sign-in
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
