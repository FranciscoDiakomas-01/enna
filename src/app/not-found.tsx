"use client";
import Image from "next/image";
import not from "../assets/notfound.svg";
export default function NotFound() {
  return (
    <main className="flex h-[100dvh] w-full justify-center items-center flex-col gap-4">
      <h1 className="text-2xl text-orange-400">
        A pagina que tentou acessar não existe
      </h1>
      <Image src={not} alt="404" className="w-[200px]" />
      <button
        className="bg-orange-400 p-2 rounded-full text-white w-[100px]"
        onClick={() => {
          window.history.back();
        }}
      >
        Voltar
      </button>
    </main>
  );
}
