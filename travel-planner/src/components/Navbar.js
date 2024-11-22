import React from "react";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Navbar() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
//  console.log(session);

  return (
    <div className="flex justify-between mx-16 my-6 py-2 gap-x-12">
      <div className="flex justify-between items-center w-[40%]">
        <h1>Travel Planner</h1>
        <h2>Markets</h2>
        <h2>Spots</h2>
        <h2>Restaurants</h2>
      </div>


      <div className="flex items-center justify-center">
        {session === null ? (
          <a
            href="/api/auth/signin"
            className="py-2 px-6 rounded-lg border border-blue-600"
          >
            SignIn
          </a>
        ) : (
          <a
            href="/api/auth/signout"
            className="py-2 px-6 rounded-lg border border-red-600"
          >
            Logout
          </a>
        )}
      </div>
    </div>
  );
}
