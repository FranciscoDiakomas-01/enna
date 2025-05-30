"use client";
import "./index.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

import "aos/dist/aos.css";
import AOS from "aos";
import ITicket from "@/types/ticket";
import { getAllTicktByID } from "@/services/tikect";
import RedirectToLogin from "@/services/redirect";

interface ITec {
  user: {
    name: string;
    lastname: string;
    email: string;
    id: number;
  };
  status: "Completed" | "Cancelled" | "Pending";
  updated: string;
  id: number;
}
export default function TicketDetail() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [task, setTask] = useState<ITicket>({
    created: "jan 12 , 2024",
    finished: "jan 12 , 2024",
    description: "",
    id: 0,
    status: "Pending",
    updated: "jan 12 , 2024",
    priority: "High",
    code: "TCK-024",
    files: [],
    title: "",
  });
  const [tec, setTec] = useState<ITec[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    async function getBydTask() {
      const data = await getAllTicktByID(id);
      setTask(data?.ticket);
      console.log(data);
      setTec(data?.tasks);
    }
    getBydTask();
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      offset: 40,
    });
  }, []);
  return (
    <main className="w-full h-full">
      {loading ? (
        <div className="h-[90dvh] w-full flex flex-col justify-center items-center">
          <SyncLoader size={7} color="orange" />
        </div>
      ) : (
        <aside className="w-full flex justify-between  lg:min-h-[90dvh] gap-4 flex-col lg:flex-row">
          <article
            className="flex flex-col gap-4 lg:w-[70%] w-full lg:mt-0 mt-[100px] "
            data-aos="zoom-in"
          >
            <div
              id="gradienr"
              className="flex justify-center items-center  p-4 lg:min-h-[300px] min-h-[250px] w-full  rounded-sm text-white text-center text-2xl"
            >
              {task.title}
            </div>
            <h1 className="lg:text-[18px] text-[15px]w-full">
              {task.description}
            </h1>
            <h1>
              Começo :{" "}
              {new Date(task.created).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </h1>
            <h1>
              {" "}
              Término :{" "}
              {new Date(task.finished).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </h1>
            <h1>
              {" "}
              Prioridade :{" "}
              {task.priority == "Low"
                ? "Baixa"
                : task.priority == "High"
                ? "Alta"
                : "Média"}
            </h1>
            <h1
              style={{
                color:
                  task.status === "Pending"
                    ? "#ebc314"
                    : task.status === "Completed"
                    ? "#28ca51"
                    : "#f81f1f",
                backgroundColor:
                  task.status === "Pending"
                    ? "#eeb90c41"
                    : task.status === "Completed"
                    ? "#28ca5041"
                    : "#ca282841",
              }}
              className="flex p-1 text-[12px] w-[120px] rounded-sm justify-center items-center "
            >
              {task.status == "Cancelled"
                ? "Canelado"
                : task.status == "Completed"
                ? "Concluída"
                : "Pendente"}
            </h1>
            {task.id && <p>Ticket : TCK-{task.id}</p>}
            <footer className="flex w-full lg:flex-row flex-col justify-between gap-3 items-center">
              <button
                className=" w-[50%] rounded-sm p-2 bg-blue-500 text-white"
                onClick={() => {
                  router.back();
                }}
              >
                Voltar
              </button>
            </footer>
          </article>
          <article
            className="flex flex-col w-full lg:w-[40%]  lg:min-h-[90dvh] lg:mb-0 mb-4"
            data-aos="fade-left"
          >
            <div className="flex flex-col gap-4">
              {Array.isArray(tec) && tec.length > 0 && (
                <div className="flex flex-col gap-2 pt-4">
                  <h1 className="text-[18px] font-semibold">
                    Técnicos {">"} Tarefas
                  </h1>
                  {tec.map((data, index) => (
                    <span
                      id={String(data?.id)}
                      key={index}
                      className="border p-3 flex flex-col gap-3 rounded-sm"
                    >
                      {data?.user && (
                        <>
                          <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-orange-400 text-white font-bold">
                            {data?.user?.name?.charAt(0).toUpperCase()}
                            {data?.user?.lastname.charAt(0).toUpperCase()}
                          </div>
                          <h1>
                            {data?.user?.name + " " + data?.user?.lastname}
                          </h1>

                          <p>{data?.user?.email}</p>
                        </>
                      )}

                      <p className="text-red-400">
                        {!data?.user && "Sem funcionário associado"}
                      </p>
                      <h1
                        style={{
                          color:
                            task.status === "Pending"
                              ? "#ebc314"
                              : task.status === "Completed"
                              ? "#28ca51"
                              : "#f81f1f",
                          backgroundColor:
                            task.status === "Pending"
                              ? "#eeb90c41"
                              : task.status === "Completed"
                              ? "#28ca5041"
                              : "#ca282841",
                        }}
                        className="flex p-1 text-[11px] w-[90px] rounded-sm justify-center items-center "
                      >
                        {task.status == "Cancelled"
                          ? "Canelado"
                          : task.status == "Completed"
                          ? "Concluída"
                          : "Pendente"}
                      </h1>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        </aside>
      )}
    </main>
  );
}
