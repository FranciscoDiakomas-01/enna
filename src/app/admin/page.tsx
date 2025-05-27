"use client";

import "aos/dist/aos.css";

import AOS from "aos";
import {
  ArrowRight,
  Box,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderEdit,
  Rocket,
  User,
} from "lucide-react";
import "./index.css";
import BarAnimation from "@/components/charts/bars";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useRouter } from "next/navigation";
export default function Admin() {
  interface ITask {
    id: number;
    title: string;
    status: "Pendente" | "Em andamento" | "Concluída" | "Cancelada";
  }
  const [load, setLoad] = useState(true);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const router = useRouter();
  useEffect(() => {
    setLoad(true);
    AOS.init({
      once: true,
      offset: 70,
      duration: 1000,
    });
    setTasks([
      {
        id: 1,
        title: "Revisar proposta de projeto",
        status: "Pendente",
      },
      {
        id: 2,
        title: "Desenvolver tela de login",
        status: "Em andamento",
      },
      {
        id: 3,
        title: "Testar integração com API",
        status: "Concluída",
      },
      {
        id: 4,
        title: "Corrigir bugs do dashboard",
        status: "Cancelada",
      },
      {
        id: 5,
        title: "Atualizar documentação técnica",
        status: "Em andamento",
      },
    ]);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  }, []);
  return (
    <main className="flex flex-col gap-4 pb-3">
      {load ? (
        <div className="flex h-screen items-center justify-center">
          <SyncLoader size={7} color="orange" />
        </div>
      ) : (
        <>
          <article className="flex mt-[100px]  flex-col justify-betweenb gap-7  lg:flex-row lg:h-[250px] lg:mt-0">
            <span
              data-aos="zoom-in"
              className="flex flex-col h-full w-full rounded-sm p-3 gap-5 pt-7 text-white lg:w-[50%] "
              id="gradienr"
            >
              <h1 data-aos="fade-up" data-aos-delay="100" className="text-2xl">
                Bem vindo ao sistema Admin👋{" "}
              </h1>
              <h2
                data-aos="fade-up"
                data-aos-delay="300"
                className=" lg:text-justify lg:w-[70%]"
              >
                Seja bem-vindo(a) ao sistema. Seu painel está pronto para
                gerenciar usuários, cursos, conteúdos e muito mais. Gere os
                relátorios do seu sistema clicando nod botões á baixo
              </h2>
              <footer
                data-aos="fade-up"
                data-aos-delay="500"
                className="flex gap-4 items-center mt-5"
              >
                <button className=" w-[140px] rounded-sm justify-center flex items-center h-[35px] p-1 text-[12px] gap-2 bg-white text-black">
                  <FileText size={13} />
                  Semanal
                </button>

                <button className=" w-[140px] h-[35px] rounded-sm justify-center flex items-center p-1 text-[12px] gap-2 border  ">
                  <FileSpreadsheet size={13} />
                  Mensal
                </button>
              </footer>
            </span>
            <span className="grid grid-cols-1 gap-4  lg:grid-cols-2 lg:w-[50%] lg:gap-3 ">
              <div
                className="border rounded-lg p-4 h-[100px]  flex justify-between items-center gap-4"
                data-aos="fade-right"
              >
                <div className="flex items-center gap-2 flex-col">
                  <span className="flex items-center h-[45px] w-[45px]  rounded-full  bg-orange-400 text-white justify-center">
                    <Rocket size={14} />
                  </span>
                  <p>Solicitações</p>
                </div>
                <span>
                  <h1 className="text-3xl ">10</h1>
                </span>
              </div>
              <div
                className="border rounded-lg p-4 h-[100px]  flex justify-between items-center gap-4"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <div className="flex items-center gap-2 flex-col">
                  <span className="flex items-center h-[45px] w-[45px] rounded-full bg-orange-400 text-white justify-center">
                    <FolderEdit size={17} />
                  </span>
                  <p>Tarefas</p>
                </div>
                <span>
                  <h1 className="text-3xl ">10</h1>
                </span>
              </div>
              <div
                className="border rounded-lg p-4 h-[100px]  flex justify-between items-center gap-4"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="flex items-center gap-2 flex-col">
                  <span className="flex items-center h-[45px] w-[45px] rounded-full bg-orange-400 text-white justify-center">
                    <User size={17} />
                  </span>
                  <p>Usuários</p>
                </div>
                <span>
                  <h1 className="text-3xl ">10</h1>
                </span>
              </div>
              <div
                className="border rounded-lg p-4 h-[100px]  flex justify-between items-center gap-4"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="flex items-center gap-2 flex-col">
                  <span className="flex items-center h-[45px] w-[45px] rounded-full bg-orange-400 text-white justify-center">
                    <Box size={17} />
                  </span>
                  <p>Serviços</p>
                </div>
                <span>
                  <h1 className="text-3xl ">10</h1>
                </span>
              </div>
            </span>
          </article>

          <article
            className="mt-5 flex justify-between gap-4 flex-col lg:flex-row"
            data-aos="zoom-in"
          >
            <div className="lg:w-[50%]  w-full">
              <BarAnimation />
            </div>
            {Array.isArray(tasks) && tasks.length > 0 && (
              <article
                className="w-full flex flex-col gap-3 lg:w-[50%]"
                data-aos="fade-left"
              >
                <div className="flex  flex-col lg:flex-row justify-between gap-1 lg:items-center ">
                  <button
                    className="w-[150px] text-[12px] h-[30px] rounded-full  mt-2 mb-7 bg-orange-400 text-white "
                    onClick={() => {
                      router.push("/admin/task");
                    }}
                  >
                    Ver todas
                  </button>
                  <h1 data-aos="zoom-in" className="text-[17px]">
                    Últimos Registros
                  </h1>
                </div>
                {tasks.map((data, key) => (
                  <span
                    key={key}
                    className="flex  items-center gap-4 border p-2 rounded-sm transition hover:bg-orange-400 hover:text-white  hover:border-orange-500"
                  >
                    <div className="lg:flex hidden">
                      <FolderEdit />
                    </div>
                    <h1 className=" w-[270px]">
                      {data.title?.slice(0, 20)} ...
                    </h1>
                    <p className="w-[100px]"> {data.status}</p>
                    <button
                      className="w-[100px] text-[12px] h-[30px] rounded-full border "
                      onClick={() => {
                        router.push(`/admin/task/${data.id}`);
                      }}
                    >
                      <ArrowRight size={13} />
                    </button>
                  </span>
                ))}
              </article>
            )}
          </article>
        </>
      )}
    </main>
  );
}
