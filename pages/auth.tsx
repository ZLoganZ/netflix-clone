import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setUserName] = useState("");

  const [variant, setVariant] = useState<"login" | "signup">("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "signup" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        password,
        name,
      });

      login();
    } catch (err: any) {
      console.log(err.message);
    }
  }, [email, password, name, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "signup" && (
                <Input
                  label="Username"
                  id="name"
                  onChange={(e) => {
                    e.preventDefault();
                    setUserName(e.target.value);
                  }}
                  value={name}
                  type="text"
                />
              )}
              <Input
                label="Email"
                id="email"
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
              />
              <Input
                label="Password"
                id="password"
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 text-white w-full py-3 mt-10 rounded-md hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Register" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
