"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Company = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/about");
  };

  return (
    <section className="company-section p-8 bg-white rounded shadow-md max-w-2xl mx-auto mt-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Company</h1>
      <Button
        className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
        onClick={handleRedirect}
      >
        About Us
      </Button>
    </section>
  );
};

export default Company;
