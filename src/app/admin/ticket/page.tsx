"use client";
import SearchBar, { SelectchBar } from "@/components/SearchBar";
import iconSize from "@/constants/iconSize";
import ITicket from "@/types/ticket";
import "aos/dist/aos.css";
import AOS from "aos";
import "./index.css";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Box,
  Edit,
  Eye,
  Lock,
  PlusCircle,
  ToggleRight,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
export default function Ticket() {
  const [load, setLoad] = useState(true);
  const data: Pick<ITicket, "title" | "code" | "priority" | "id" | "status"> = {
    code: "",
    id: 0,
    priority: "Higth",
    status: "Cancelled",
    title: "",
  };
  const [category, setCategory] = useState<Icategory[]>([]);
  const [Ticket, setTicket] = useState<(typeof data)[]>([]);
  useEffect(() => {
    setLoad(true);
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      offset: 40,
    });
    setCategory([
      {
        id: 1,
        text: "Hardware",
      },
      {
        id: 13,
        text: "Software",
      },
      {
        id: 14,
        text: "Decoração",
      },
    ]);
    setTicket([
      {
        id: 1,
        code: "TCK-001",
        title: "Erro ao acessar o painel de controle",
        priority: "Higth",
        status: "Pedding",
      },
      {
        id: 2,
        code: "TCK-002",
        title: "Atualização de dados do cliente",
        priority: "Medium",
        status: "Conpleted",
      },
      {
        id: 3,
        code: "TCK-003",
        title: "Solicitação de nova funcionalidade",
        priority: "Low",
        status: "Cancelled",
      },
      {
        id: 4,
        code: "TCK-004",
        title: "Problemas com o login",
        priority: "Higth",
        status: "Pedding",
      },
      {
        id: 5,
        code: "TCK-005",
        title: "Erro no envio de e-mails automáticos",
        priority: "Medium",
        status: "Conpleted",
      },
      {
        code: "TCK-006",
        id: 1,
        priority: "Higth",
        status: "Conpleted",
        title: "Instalação do Primavera",
      },
    ]);
    setTimeout(() => {
      setLoad(false);
    }, 4000);
  }, []);
  return (
    <main className="flex pt-[10px] flex-col gap-4 mt-[50px] lg:mt-0">
      <header className="w-full flex center items-center  justify-end gap-[5px] p-[10px] pt-[20px] lg:sticky lg:top-0 bg-white lg:z-10">
        <button className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px] w-[120px]">
          <PlusCircle size={iconSize.iconSize} />
          Nova
        </button>
      </header>
      <article className="flex flex-col gap-9 border p-3  rounded-sm h-full mb-2 ">
        <header className="flex  flex-col justify-between items-center gap-5 lg:flex-row">
          <SearchBar onClick={() => {}} placeholder="Ticket da Solicitação" />
          <SelectchBar
            onClick={() => {}}
            placeholder="Filtar por estado"
            values={category}
          />
        </header>
        {load ? (
          <div className="h-full flex justify-center items-center">
            <SyncLoader size={7} color="orange" />
          </div>
        ) : (
          <>
            {Ticket.length == 0 ? (
              <div className="h-full flex justify-center items-center flex-col gap-4">
                <h1 className="text-2xl text-purple-500">Sem solicitações</h1>
              </div>
            ) : (
              <aside className="h-full flex flex-col gap-3">
                <span
                  id="grid"
                  className=" hidden  justify-between items-center h-[40px]  w-full border  rounded-sm bg-orange-400  text-orange-400 pl-3 pr-3 gap-[10px] lg:flex"
                  data-aos="fade-up"
                >
                  <p className="flex items-center gap-2">
                    <Lock size={iconSize.iconSize} />
                    Ticket
                  </p>
                  <p className="flex items-center gap-2">
                    <Box size={iconSize.iconSize} />
                    Título
                  </p>
                  <p className="flex items-center gap-2">
                    {" "}
                    <ToggleRight size={iconSize.iconSize} />
                    Estado
                  </p>
                  <p className="flex items-center gap-2">
                    {" "}
                    <ToggleRight size={iconSize.iconSize} />
                    Prioridade
                  </p>
                  <p>Ações</p>
                </span>
                {Ticket.map((data, key) => (
                  <span
                    id="grid"
                    data-aos="fade-up"
                    className="p-2 rounded-sm flex justify-between    w-full border  transition-all duration-200 ease-in-out hover:cursor-pointer flex-col lg:flex-row lg:h-[40px] lg:items-center gap-[10px]"
                    key={key}
                  >
                    <p>{data.code}</p>
                    <p className="w-[100px] ">{data.title?.slice(0, 50)} ...</p>
                    <p>
                      {data.status == "Conpleted" ? (
                        <span className="text-green-500">Concluído</span>
                      ) : data.status == "Cancelled" ? (
                        <span className="text-red-500">Cancelado</span>
                      ) : (
                        <span className="text-yellow-500">Pendente</span>
                      )}
                    </p>
                    <p>
                      {data.priority == "Higth" ? (
                        <span className="text-red-500 flex items-center gap-[2px] text-[13px]">
                          Alta <ArrowUp size={12} />{" "}
                        </span>
                      ) : data.priority == "Medium" ? (
                        <span className="text-yellow-500">Média</span>
                      ) : (
                        <span className="text-green-500 flex items-center gap-1">
                          {" "}
                          <ArrowDown size={12} /> Baixa
                        </span>
                      )}
                    </p>
                    <div className="grid grid-cols-3  w-full gap-2">
                      <button className="flex gap-[5px] items-center justify-center p-[7px] border text-purple rounded-[5px] text-[13px] w-[30px]">
                        <Eye size={iconSize.iconSize} />
                      </button>
                      <button className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px] w-[30px]">
                        <Edit size={iconSize.iconSize} />
                      </button>
                      <button className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-red-400 rounded-[5px] text-[13px] w-[30px]">
                        <Trash size={iconSize.iconSize} />
                      </button>
                    </div>
                  </span>
                ))}
              </aside>
            )}
          </>
        )}
        <footer className="flex justify-between items-center border-t pt-2">
          <p>1 de 10</p>
          <span className="flex justify-between items-center gap-1">
            <button className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px] w-[30px]">
              <ArrowLeft size={iconSize.iconSize} />
            </button>
            <button className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px] w-[30px]">
              {" "}
              <ArrowRight size={iconSize.iconSize} />
            </button>
          </span>
        </footer>
      </article>
    </main>
  );
}
