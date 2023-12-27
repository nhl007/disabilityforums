import SignIn from "@/components/SignIn";
import { getAuthSession } from "@/libs/auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getAuthSession();
  if (session && session.user) {
    redirect("/");
  }
  return (
    <div className="w-full h-full">
      <SignIn />
    </div>
  );
};

export default Login;
