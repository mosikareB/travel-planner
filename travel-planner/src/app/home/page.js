"use client";
import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  useEffect(function () {
    async function fetchData() {
      toast.loading("Generating recommendations...");
      const response = await fetch("https://locathost:3000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: location }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Recommendations generated successfully!");
        setData(result.recommendations);
      } else {
        toast.error("Failed to generate recommendations!");
      }
    }
  }, []);
  const handleInput = (e) => {
    setLocation(e.target.value);
  };
  return (
    <div className="flex justify-between mx-16 my-6 py-2 gap-x-12">
      <input
        type="text"
        title="Location"
        placeholder="Enter Your Location..."
        className="py-3 px-6 border border-blue-600 rounded-xl w-[50%]"
        onChange={handleInput}
      />
      <button>Generate</button>
    </div>
  );
}
