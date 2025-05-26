"use client";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";
import iconSize from "@/constants/iconSize";
import IClient from "@/types/client";
import { Edit, FolderEdit, Trash } from "lucide-react";

export default function ClientCard({ client }: { client: IClient }) {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true, easing: "ease-in-out" });
    Aos.refresh();
  }, []);
  return (
    <figure
      className=" relative border p-4 rounded-sm flex flex-col gap-4 overflow-hidden"
      data-aos="fade-up"
    >
      <header
        className="flex items-center justify-between"
        data-aos="fade-left"
      >
        <div className="w-[50px] h-[30px] rounded-full bg-[orange] border border-orange-400 text-white flex items-center justify-center gap-1 ">
          <FolderEdit size={iconSize.iconSize} />
          {client.works}
        </div>
        <div className="relative flex items-center gap-4">
          <span className="-top-3 -right-3 w-[50px] h-[30px] rounded-full bg-white border border-orange-400 text-orange-400 flex items-center justify-center gap-1 ">
            {client.gender}
          </span>
        </div>
      </header>
      <h1
        data-aos="fade-right"
        data-aos-delay="200"
        className="text-[15px] font-bold text-center  flex justify-center items-center w-[35px] h-[35px] rounded-full bg-orange-400 text-white"
      >
        {client.name.charAt(0).toUpperCase()}
        {client.lastname.charAt(0).toUpperCase()}
      </h1>
      <h2
        data-aos="fade-right"
        data-aos-delay="100"
        className="text-[15px] font-bold"
      >
        {client.name} {client.lastname}
      </h2>
      <p data-aos="fade-right" data-aos-delay="200">
        {client.email}
      </p>
      <p data-aos="fade-right" data-aos-delay="300">
        {client.phone}
      </p>
      <footer className="flex items-center justify-between gap-2">
        <button className="border border-orange-500 w-[50%] flex items-center justify-center gap-1 h-[30px] rounded-full text-[11px]">
          Editar <Edit size={12} />
        </button>
        <button className="w-[50%] flex items-center bg-red-500 justify-center gap-1 h-[30px] rounded-full text-white text-[11px]">
          Deletar <Trash size={12} />
        </button>
      </footer>
    </figure>
  );
}
