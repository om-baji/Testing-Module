"use client";
import { useState } from "react";
import AuthHeader from "@/components/ui/AuthHeader";
import Link from "next/link";
import { login } from "@/server/actions/user";
import { useToast } from "@/components/ui/ToastProvider";
import { ROLES } from "@/server/utils/types";

const Login = () => {
  const [role, setRole] = useState<ROLES>(ROLES.Student);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      if (response.success) {
        showToast(response.message, "success");
      } else {
        showToast(response.error, "error");
      }
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };
  return (
    <>
      <AuthHeader />
      <div className="w-full min-h-screen py-10 bg-gradient-to-b from-yellow-50 via-white to-blue-300">
        <div className="w-full h-full flex justify-center items-center flex-col">
          <form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-60 border border-black shadow-lg rounded-2xl p-8 w-11/12 max-w-4xl"
          >
            <div className="flex items-center gap-2 justify-center">
              <button
                type="button"
                onClick={() => setRole(ROLES.Student)}
                className={`linear duration-300 py-2 border border-black shadow-md rounded-3xl px-6 ${
                  role === ROLES.Student ? "bg-red-400 text-white" : ""
                }`}
              >
                विद्यार्थी
              </button>
              <button
                type="button"
                onClick={() => setRole(ROLES.Teacher)}
                className={`linear duration-300 py-2 border border-black shadow-md rounded-3xl px-6 ${
                  role === ROLES.Teacher ? "bg-red-400 text-white" : ""
                } `}
              >
                शिक्षक
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">वापरकर्तानाव</label>
                <div className="flex items-center gap-6 justify-between">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="black"
                    className="size-11"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <input
                    className="py-2 px-4 flex-1 border border-black shadow-md rounded-3xl"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">पासवर्ड</label>
                <div className="flex items-center gap-6 justify-between">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="size-11"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>

                  <input
                    className="py-2 px-4 flex-1 border border-black shadow-md rounded-3xl"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button className="py-2 px-12 bg-red-400 text-white text-2xl font-medium rounded-2xl shadow-md">
                लॉगिन करा
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between w-11/12 max-w-4xl px-8 py-4">
            <Link href={"/register"} className="text-blue-600">
              तुम्ही नवीन आहात का?
            </Link>
            {role === "teacher" && (
              <Link href={"/forgot-password"} className="text-blue-600">
                पासवर्ड विसरलात?
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
