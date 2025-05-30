"use client";

import "aos/dist/aos.css";
import AOS from "aos";
import { File } from "lucide-react";
import "./index.css";
import iconSize from "@/constants/iconSize";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TaskCard({ task  , admin }: { task: ITask , admin : boolean  }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      offset: 70,
    });
  }, []);
  const router = useRouter()
  return (
    <figure
      className="flex flex-col gap-2 bg-white p-4 rounded-lg  border border-dashed "
      data-aos="fade-up"
    >
      <div className="h-[50px] w-[50px] flex items-center justify-center rounded-[50%] bg-orange-400 text-white">
        <File size={iconSize.iconSize} />
      </div>
      <div>
        <h1>{task.title}</h1> <br />
        <h1>{task.description?.slice(0, 100)}...</h1> <br />
      </div>
      <footer className="flex items-center justify-between">
        <span
          className="flex items-center justify-center rounded-full px-2 py-1 text-[12px]"
          style={{
            color:
              task.status === "Pending"
                ? "#ebc314"
                : task.status === "Working"
                ? "#2789da"
                : task.status === "Completed"
                ? "#28ca51"
                : "#f81f1f",
            backgroundColor:
              task.status === "Pending"
                ? "#eeb90c41"
                : task.status === "Working"
                ? "#0c66ee41"
                : task.status === "Completed"
                ? "#28ca5041"
                : "#ca282841",
          }}
        >
          {task.status === "Pending" && (
            <span className="pendente">Pendente</span>
          )}
          {task.status === "Working" && (
            <span className="andamento">Andamento</span>
          )}
          {task.status === "Completed" && (
            <span className="concluida">Concluída</span>
          )}
          {task.status === "Cancelled" && (
            <span className="cancelada">Cancelada</span>
          )}
        </span>
        <button
          className="flex gap-[5px] items-center justify-center p-[7px] border text-purple-600 rounded-[5px] text-[13px] w-[80px]"
          onClick={() => {
            if (admin) {
              router.push(`/admin/task/${task.id}`);
            } else {
              router.push(`/tenic/task/${task.id}`);
            }
          }}
        >
          Detalhes
        </button>
      </footer>
    </figure>
  );
}
