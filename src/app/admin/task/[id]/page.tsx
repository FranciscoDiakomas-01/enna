"use client";
import "./index.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader, SyncLoader } from "react-spinners";

import "aos/dist/aos.css";
import AOS from "aos";
import { deleteTaskById, getTaskById } from "@/services/task";
import RedirectToLogin from "@/services/redirect";
interface ITenics {
  id: number;
  name: string;
  lastname: string;
  email: string;
  bio: string;
}
export default function TaskDetail() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [addError, setAdErro] = useState("");
  const [addSucess, setAddSUcess] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [task, setTask] = useState<ITask>({
    updated: new Date(),
    finished: new Date(),
    created: new Date(),
    description: "",
    id: 0,
    title: "",
    status: "Pending",
    ticketId: 1,
  });
  const [tecnics, setTecnics] = useState<ITenics>({
    id: 0,
    email: "",
    lastname: "",
    name: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    async function get() {
      const data = await getTaskById(+id);
      console.log(data);
      setTask(data?.task);
      setTecnics(data?.user);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    get();

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
              {task?.title}
            </div>
            <h1 className="lg:text-[18px] text-[15px]w-full">
              {task?.description}
            </h1>
            <h1>
              Começo :{" "}
              {new Date(task?.created as Date).toLocaleDateString("pt")}
            </h1>
            <h1>
              {" "}
              Término :{" "}
              {new Date(task?.finished as Date).toLocaleDateString("pt")}
            </h1>
            <h1>
              {" "}
              Actualização :{" "}
              {new Date(task?.updated as Date).toLocaleDateString("pt")}
            </h1>
            <h1
              style={{
                color:
                  task?.status === "Pending"
                    ? "#ebc314"
                    : task?.status === "Working"
                    ? "#2789da"
                    : task?.status === "Completed"
                    ? "#28ca51"
                    : "#f81f1f",
                backgroundColor:
                  task?.status === "Pending"
                    ? "#eeb90c41"
                    : task?.status === "Working"
                    ? "#0c66ee41"
                    : task?.status === "Completed"
                    ? "#28ca5041"
                    : "#ca282841",
              }}
              className="flex p-1 text-[12px] w-[120px] rounded-sm justify-center items-center "
            >
              {task?.status === "Pending"
                ? "Pendente"
                : task?.status === "Working"
                ? "Em andamento"
                : task?.status === "Completed"
                ? "Concluída"
                : "Desconhecido"}
            </h1>
            {task.ticketId && <p>Ticket : TCK-{task.ticketId}</p>}
            <footer className="flex w-full lg:flex-row flex-col justify-between gap-3 items-center">
              <button
                className=" w-full rounded-sm p-2 bg-red-500 text-white"
                onClick={async () => {
                  const id = task.id;
                  setAddLoading(true);
                  const deleted = await deleteTaskById(id);
                  if (deleted) {
                    setTimeout(() => {
                      setAddLoading(false);
                      setAddSUcess("Removido com sucesso");
                      setAdErro("");
                    }, 3000);
                    setTimeout(() => {
                      router.back();
                    }, 6000);
                  } else {
                    setTimeout(() => {
                      setAddLoading(false);
                      setAddSUcess("");
                      setAdErro("Erro ao remover");
                    }, 3000);
                  }
                }}
              >
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
            <p className="text-center text-red-400">{addError}</p>
            <p className="text-center text-green-400">{addSucess}</p>
            {addLoading && (
              <ClipLoader className="flex place-self-center" color="orange" />
            )}
          </article>
          <article
            className="flex flex-col w-full lg:w-[40%]  lg:min-h-[90dvh] lg:mb-0 mb-4"
            data-aos="fade-left"
          >
            {tecnics?.name && (
              <span
                id={String(tecnics.id)}
                className="border p-3 flex flex-col gap-3 rounded-sm"
              >
                <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-orange-400 text-white font-bold">
                  {tecnics.name?.charAt(0).toUpperCase()}
                  {tecnics.lastname.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-red-500">Responsável pela tarefa</h2>
                <h1>{tecnics.name + " " + tecnics.lastname}</h1>
                <p>{tecnics.email}</p>
                <p>{tecnics.bio}</p>
              </span>
            )}
          </article>
        </aside>
      )}
    </main>
  );
}
