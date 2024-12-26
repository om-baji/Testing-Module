"use client";
import { useState } from "react";
import AuthHeader from "@/components/ui/AuthHeader";
import Link from "next/link";
import { SignUp } from "@/server/actions/user";
import { useToast } from "@/components/ui/ToastProvider";
import { ROLES } from "@/server/utils/types";

const Register = () => {
  const [role, setRole] = useState<ROLES>(ROLES.Student);
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>(Date.now().toString());
  const [email, setEmail] = useState<string>("");
  const [schoolId, setSchoolId] = useState<string>("शाळा क्रमांक १");
  const [invitationId, setInvitationId] = useState<string>("");

  const { showToast } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await SignUp({
        firstName,
        middleName,
        surname,
        dateOfBirth,
        role,
        schoolId,
        email,
        invitationId,
      });
      if (response.success) {
        showToast(response.message, "success");
        showToast(`Your username: ${response.user.username}`, "success");
      } else {
        showToast(response.message, "error");
      }
    } catch (error: any) {
      showToast(error, "error");
    }
  };

  return (
    <>
      <AuthHeader />
      <div className="w-full min-h-screen py-10 bg-gradient-to-b from-yellow-50 via-white to-blue-300">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-60 border border-black shadow-lg rounded-2xl p-8 w-11/12 max-w-4xl"
          >
            <h2 className="text-4xl font-bold text-center mb-8">नोंदणी करा</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">पहिले नाव</label>
                <input
                  className="p-3 border border-black shadow-md rounded-2xl"
                  type="text"
                  placeholder="First Name Here"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">मधले नाव</label>
                <input
                  className="p-3 border border-black shadow-md rounded-2xl"
                  type="text"
                  placeholder="Middle Name Here"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">आडनाव</label>
                <input
                  className="p-3 border border-black shadow-md rounded-2xl"
                  type="text"
                  placeholder="Surname Here"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">जन्मतारीख</label>
                <input
                  type="date"
                  className="p-3 border border-black shadow-md rounded-2xl"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xl font-light mb-2">भूमिका</label>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setRole(ROLES.Teacher)}
                    className={`flex-1 linear duration-300 p-3 border border-black shadow-md rounded-l-xl ${
                      role === ROLES.Teacher && "bg-red-400 text-white"
                    }`}
                  >
                    शिक्षक
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole(ROLES.Student)}
                    className={`flex-1 linear duration-300 p-3 border border-black shadow-md rounded-r-xl ${
                      role === ROLES.Student && "bg-red-400 text-white"
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
                    <option value="शाळा क्रमांक १">शाळा क्रमांक १</option>
                    <option value="शाळा क्रमांक २">शाळा क्रमांक २</option>
                  </select>
                  <div className="absolute top-3 right-3 w-6 h-6 bg-[url('/down-arrow.png')]"></div>
                </div>
              </div>
              {role === ROLES.Teacher && (
                <>
                  <div className="flex flex-col">
                    <label className="text-xl font-light mb-2">ई-मेल</label>
                    <input
                      className="p-3 border border-black shadow-md rounded-2xl"
                      type="email"
                      placeholder="abc123@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={invitationId}
                      onChange={(e) => setInvitationId(e.target.value)}
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
