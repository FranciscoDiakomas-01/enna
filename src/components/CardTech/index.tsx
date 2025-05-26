"use client";
import iconSize from "@/constants/iconSize";
import IUser from "@/types/user";
import "./index.css";
import { Check, Rocket, Trash, X } from "lucide-react";

import AOS from "aos";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";

export default function CardTech({ tech }: { tech: IUser }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      offset: 200,
    });
  }, []);
  return (
    <figure
      data-aos="fade-up"
      className="flex flex-col gap-3  p-2 border-[1px] rounded-[6px]"
    >
      <div
        className="relative overflow-hidden w-[100%] rounded-[9px] h-[200px] flex justify"
        id="relativeCard"
      >
        <p className="text-2xl font-bold">
          {tech.name?.charAt(0).toUpperCase()}{""}
          {tech.lastname?.charAt(0).toUpperCase()}
        </p>
      </div>
      <figcaption className="flex justify-between ">
        <div className="flex flex-col gap-[5px]">
          <h2 className="tex-[17px] font-bold">
            {tech.name} {tech.lastname}
          </h2>
          <small>{tech.area}</small>
          <p>{tech.email}</p>
          <p>
            Rendimento de{" "}
            {Math.floor((Number(tech.completed) / Number(tech.total)) * 100)}%{" "}
          </p>
          <div className="h-[8px] rounded-[30px] bg-gray-100 w-full relative overflow-hidden">
            <span
              style={{
                width: `${Math.floor(
                  (Number(tech.completed) / Number(tech.total)) * 100
                )}%`,
                backgroundColor:
                  (Number(tech.completed) / Number(tech.total)) * 100 < 50
                    ? "#E83F5B"
                    : "",
              }}
              className="transition w-full h-full bg-[#04D361] absolute"
            ></span>
          </div>
        </div>
        <span>
          <div>
            <p>Terefas</p>
          </div>
          <div className="flex gap-1 items-center">
            <Check color="#04D361" fill="#04D361" size={iconSize.iconSize} />{" "}
            {tech.completed}
          </div>
          <div className="flex gap-1 items-center">
            <Rocket color="gold" fill="gold" size={iconSize.iconSize} />{" "}
            {tech.peending}
          </div>{" "}
          <div className="flex gap-1 items-center">
            <X color="#E83F5B" fill="#E83F5B" size={iconSize.iconSize} />{" "}
            {tech.canceled}
          </div>
        </span>
      </figcaption>

      <footer className="flex justify-between items-center gap-4">
        <button className="w-full bg-orange-400 text-white rounded-[3px]  h-[30px] flex items-center justify-center gap-[3px] text-[13px]">
          <Rocket size={iconSize.iconSize} /> Restaurar
        </button>
        <button className="w-full bg-white border-[1px] border-dashed text-purple-700 rounded-[3px]  h-[30px] flex items-center justify-center gap-[3px] text-[13px]">
          <Trash size={iconSize.iconSize} /> Deletar
        </button>
      </footer>
    </figure>
  );
}
