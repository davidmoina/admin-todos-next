"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("client side");
  }, []);

  return (
    <div>
      <h1>Hello Page</h1>
      <hr />

      <div className="flex flex-col">
        <span>{session?.user?.name}</span>
        <span>{session?.user?.email}</span>
        <span>{session?.user?.image}</span>
        <span>{session?.user?.id}</span>
        <span>{session?.user?.roles?.join(",")}</span>
      </div>
    </div>
  );
}
