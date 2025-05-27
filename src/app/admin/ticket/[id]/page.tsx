"use client";
import "./index.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

import "aos/dist/aos.css";
import AOS from "aos";
import ITicket from "@/types/ticket";
interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  description? : string
}
export default function TicketDetail() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [task, setTask] = useState<ITicket>({
    created_at: "jan 12 , 2024",
    date_end: "jan 12 , 2024",
    description: "",
    id: 0,
    status: "Pedding",
    updated_at: "jan 12 , 2024",
    priority: "Higth",
    client_id: 1,
    code: "TCK-024",
    files: [],
    title: ""
  });
  const [Client, setClient] = useState<IUser>({
    id: 0,
    email: "",
    lastname: "",
    name: "",
  });
  const [tec, setTec] = useState < IUser[]>()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTec([
      {
        id: 1,
        name: "Lucas",
        lastname: "Silva",
        email: "lucas.silva@empresa.com",
        description: "Técnico de suporte especializado em redes e servidores.",
      },
      {
        id: 2,
        name: "Mariana",
        lastname: "Costa",
        email: "mariana.costa@empresa.com",
        description:
          "Analista responsável por sistemas e softwares corporativos.",
      },
      {
        id: 3,
        name: "João",
        lastname: "Oliveira",
        email: "joao.oliveira@empresa.com",
        description: "Responsável por atendimento de primeiro nível (N1).",
      },
    ]);
    setTimeout(() => {
      setLoading(false);
      setClient({
        id: 1,
        name: "Ana",
        lastname: "Souza",
        email: "anasouza@gmal.com",
      });
      setTask({
        id: 0,
        status: "Conpleted",
        description:
          "Corrigir o bug que impede o envio de anexos no formulário de suporte.",
        title :
          "O erro só ocorre em dispositivos móveis. Testar no Chrome e Safari.",
        files: [],
        date_end: "set 20 2025",
        created_at: "set 20 2025",
        updated_at: "set 20 2025",
        client_id: 1,
        code: "TCK-0234",
        priority : "Higth"
      });
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
        <aside className="w-full flex justify-between items-center lg:min-h-[90dvh] gap-4 flex-col lg:flex-row">
          <article
            className="flex flex-col gap-4 justify-center lg:w-[70%] w-full lg:mt-0 mt-[100px]"
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
            <h1>Começo : {task.created_at}</h1>
            <h1> Término : {task.date_end}</h1>
            <h1
              style={{
                color:
                  task.status === "Pedding"
                    ? "#ebc314"
                    : task.status === "Cancelled"
                    ? "#28ca51"
                    : "#f81f1f",
                backgroundColor:
                  task.status === "Pedding"
                    ? "#eeb90c41"
                    : task.status === "Cancelled"
                    ? "#28ca5041"
                    : "#ca282841",
              }}
              className="flex p-1 text-[12px] w-[120px] rounded-sm justify-center items-center "
            >
              {task.status}
            </h1>
            {task.code && <p>Ticket : {task.code}</p>}
            <footer className="flex w-full lg:flex-row flex-col justify-between gap-3 items-center">
              <button className="w-full rounded-sm p-2 bg-orange-400 text-white">
                Editar
              </button>
              <button className=" w-full rounded-sm p-2 bg-red-500 text-white">
                Remover
              </button>
              <button
                className=" w-full rounded-sm p-2 bg-blue-500 text-white"
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
            {Client?.name && (
              <span
                id={String(Client.id)}
                className="border p-3 flex flex-col gap-3 rounded-sm"
              >
                <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-orange-400 text-white font-bold">
                  {Client.name?.charAt(0).toUpperCase()}
                  {Client.lastname.charAt(0).toUpperCase()}
                </div>
                <h1>{Client.name + " " + Client.lastname}</h1>
                <p>{Client.email}</p>
                <h1>Actualizou : {task.updated_at}</h1>
                <footer className="flex justify-between">
                  <button className="w-[30%] rounded-full text-white p-2 bg-orange-400 text-[12px]">
                    Ver perfil
                  </button>

                  <button className="w-[30%] rounded-full text-white p-2 bg-red-500 text-[12px]">
                    Remover
                  </button>
                </footer>
              </span>
            )}
          </article>
        </aside>
      )}
    </main>
  );
}
