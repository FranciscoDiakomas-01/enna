"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logout } from "./logout";

export default function RedirectToLogin() {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    const usertype = localStorage.getItem("usertype");
    const token = localStorage.getItem("token");

    if (!token || !usertype || !userId) {
      Logout();
      router.push("/");
    } else if (usertype === "Admin") {
      if (path.includes("/tecnic")) {
        router.push("/");
      }
    } else if (usertype === "Tecnic") {
      if (path.includes("/admin")) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [path, router]);

  return null; // ou um loading spinner se quiser
}
