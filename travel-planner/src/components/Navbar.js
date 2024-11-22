import React from "react";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  return (
    <div className="flex justify-between mx-8 my-6 py-2 gap-x-12">
      <div className="flex justify-between items-center gap-x-12">
        <h1 className="font-bold">Travel Planner</h1>
        <Link href={"/my-locations"}>My Locations</Link>
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
