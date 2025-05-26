"use client";
import "./globals.css";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <main className="flex  h-[100dvh] justify-center items-center">
      <form
        action=""
        className=" p-4 flex flex-col gap-4 place-self-center w-[80%] lg:w-[30%] md:w-[50%]"
      >
        <Logo />
        <label htmlFor="email">Email</label>
        <input
          required
          className="outline-0 h-[40px] border p-2 rounded-sm "
          type="email"
          id="email"
          placeholder="exemplo@gmail.com"
        />
        <label htmlFor="passowrd">Senha</label>
        <input
          required
          className="outline-0 h-[40px] border p-2 rounded-sm "
          type="password"
          name="passowrd"
          id="passowrd"
          placeholder="Entre com sua senha"
        />
        <button
          className="bg-orange-400 text-white w-full h-[40px] rounded-full text-[13px] transition hover:bg-orange-500"
          onClick={() => {
            router.push("/admin");
          }}
          type="button"
        >
          Entrar
        </button>
        {error && <p className="text-red-400 text-center">{error}</p>}
      </form>
    </main>
  );
}
