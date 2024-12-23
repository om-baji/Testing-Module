"use client";
import React, { useState } from "react";
import Inputs from "./Inputs";
import ToggleGroup from "./ToggleButton";
import Link from "next/link";
import { OPTION } from "@/utils/types";

const LoginDetails: React.FC = () => {
  const [role, setRole] = useState<OPTION>(OPTION.Teacher); 

  const handleRoleChange = (newRole: OPTION) => {
    setRole(newRole);
  };

  return (
    <div className="flex flex-col gap-8 p-12 rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-center mb-4">
        <ToggleGroup
          selectedValue={role}
          id="roleToggle"
          label=""
          onChange={handleRoleChange}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Inputs placeholder="वापरकर्त्याचे आयडी" label={"Username"} />
        <Inputs placeholder="पासवर्ड" label={"Password"} />
      </div>

      <div className="flex justify-center mt-4">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">लॉग इन</button>
      </div>

      <div className="flex justify-between mt-4 text-blue-500 text-sm">
        <Link href="#">तुम्ही नवीन आहात का?</Link>
        <Link href="#">पासवर्ड विसरलात?</Link>
      </div>
    </div>
  );
};

export default LoginDetails;
