"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl mb-4">Dashboard</h1>

        <button
          onClick={() => signOut()}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Sign out
        </button>
      </div>
    );
  }

  return null;
}
