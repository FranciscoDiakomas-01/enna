"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
export default function UseAuth() {
  type UserType = "Admin" | "Tecnic";
  if (typeof window === "undefined") return;
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const userId = String(localStorage.getItem("userid"));
    const usertype = String(localStorage.getItem("usertype")) as UserType;
    const token = String(localStorage.getItem("token"));
    if (!token || !usertype || !userId) {
      localStorage.clear();
      router.push("/");
      return;
    } else if (token && userId && usertype == "Admin") {
      if (path.includes("/tecnic")) {
        router.push("/");
      } else {
        router.push("/admin");
      }
      return;
    } else if (token  && userId && usertype == "Tecnic") {
      if (path.includes("/admin")) {
        router.push("/");
      } else {
        router.push("/tecnic");
      }
    } else {
      router.push("/");
      return;
    }
  }, []);
}
