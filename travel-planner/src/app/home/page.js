"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Page() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const fetchRecommendations = async () => {
    if (!location.trim()) {
      toast.error("Please enter a location!");
      return;
    }

    setIsLoading(true);
    console.log(data);

    const toastId = toast.loading("Generating recommendations...");

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: location,
          email: session?.user?.email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Recommendations generated successfully!", {
          id: toastId,
        });
        setData(
          Array.isArray(result.recommendations)
            ? result.recommendations
            : [result.recommendations]
        );
      } else {
        toast.error(result.error || "Failed to generate recommendations!", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast.error("Failed to connect to the server!", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 mx-16 my-6">
      <div className="flex gap-4">
        <input
          type="text"
          title="Location"
          placeholder="Enter Your Location..."
          className="py-3 px-6 border border-blue-600 rounded-xl w-full max-w-2xl"
          onChange={handleInput}
          value={location}
        />
        <button
          onClick={fetchRecommendations}
          disabled={isLoading}
          className={`px-6 py-3 rounded-xl text-white ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>

      {data.length > 0 && (
        <div className="flex flex-col gap-4">
          {data.map((recommendation, index) => (
            <div
              key={index}
              className="p-6 border border-blue-600 rounded-xl"
              dangerouslySetInnerHTML={{ __html: recommendation }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
