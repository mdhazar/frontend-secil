"use client";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { signOut } from "next-auth/react";
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex h-23 rounded-md bg-blue-300"></div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button
            type="button"
            onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
