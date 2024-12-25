"use client";
import { useState } from "react";
import AuthHeader from "@/components/ui/AuthHeader";
import Link from "next/link";

const Register = () => {
  const [isTeacher, setIsTeacher] = useState<boolean>(false);

  return (
    <>
      <AuthHeader />
      <div className="w-full min-h-screen py-10 bg-gradient-to-b from-yellow-50 via-white to-blue-300">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <form className="bg-white bg-opacity-60 border border-black shadow-lg rounded-2xl p-8 w-11/12 max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-8">नोंदणी करा</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">पहिले नाव</label>
                <input
                  className="p-3 border border-black shadow-md rounded-2xl"
                  type="text"
                  placeholder="First Name Here"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">मधले नाव</label>
                <input
                  className="p-3 border border-black shadow-md rounded-2xl"
                  type="text"
                  placeholder="Middle Name Here"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">आडनाव</label>
                <input
                  className="p-3 border border-black shadow-md rounded-2xl"
                  type="text"
                  placeholder="Surname Here"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">जन्मतारीख</label>
                <input
                  className="p-3 border border-black shadow-md rounded-2xl"
                  type="text"
                  placeholder="DD/MM/YYYY"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">भूमिका</label>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setIsTeacher(true)}
                    className={`flex-1 linear duration-300 p-3 border border-black shadow-md rounded-l-xl ${
                      isTeacher ? "bg-red-400 text-white" : ""
                    }`}
                  >
                    शिक्षक
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsTeacher(false)}
                    className={`flex-1 linear duration-300 p-3 border border-black shadow-md rounded-r-xl ${
                      isTeacher ? "" : "bg-red-400 text-white"
                    } `}
                  >
                    विद्यार्थी
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">शाळेचे नाव</label>
                <div className="relative">
                  <select className="p-3 border border-black shadow-md rounded-2xl w-full">
                    <option>शोधा किंवा निवडा</option>
                  </select>
                  <div className="absolute top-3 right-3 w-6 h-6 bg-[url('/down-arrow.png')]"></div>
                </div>
              </div>
              {isTeacher && (
                <>
                  <div className="flex flex-col">
                    <label className="text-xl font-light mb-2">ई-मेल</label>
                    <input
                      className="p-3 border border-black shadow-md rounded-2xl"
                      type="email"
                      placeholder="abc123@gmail.com"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xl font-light mb-2">
                      आमंत्रण कोड
                    </label>
                    <input
                      className="p-3 border border-black shadow-md rounded-2xl"
                      type="text"
                      placeholder="XYZ-123-ABC"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-center mt-8">
              <button className="py-2 px-12 bg-red-400 text-white text-2xl font-medium rounded-2xl shadow-md">
                पुढील
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center w-11/12 max-w-4xl mt-4">
            <Link href={"/login"} className="text-blue-600">
              लॉग इन करा
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
