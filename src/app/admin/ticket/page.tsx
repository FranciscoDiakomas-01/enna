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
import { useRouter } from "next/navigation";
export default function Ticket() {
  const [load, setLoad] = useState(true);
  const data: Pick<
    ITicket,
    "title" | "code" | "priority" | "id" | "status" | "description"
  > = {
    code: "",
    id: 0,
    priority: "Higth",
    status: "Cancelled",
    title: "",
    description: "",
  };
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [active, setactive] = useState<
    Pick<
      ITicket,
      "title" | "code" | "priority" | "id" | "status" | "description"
    >
  >({
    code: "",
    id: 0,
    priority: "Higth",
    status: "Cancelled",
    title: "",
    description: "",
  });
  const [category, setCategory] = useState<Icategory[]>([]);
  const [Ticket, setTicket] = useState<(typeof data)[]>([]);
  const router = useRouter();
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
        text: "Alta",
      },
      {
        id: 13,
        text: "Baixa",
      },
      {
        id: 14,
        text: "Média",
      },
      {
        id: 1,
        text: "Pendentes",
      },
      {
        id: 13,
        text: "Completas",
      },
      {
        id: 14,
        text: "Canceladas",
      },
    ]);
    setTicket([
      {
        id: 1,
        code: "TCK-001",
        title: "Erro ao acessar o painel de controle",
        priority: "Higth",
        status: "Pedding",
        description: "",
      },
      {
        id: 2,
        code: "TCK-002",
        title: "Atualização de dados do cliente",
        priority: "Medium",
        status: "Conpleted",
        description: "",
      },
      {
        id: 3,
        code: "TCK-003",
        title: "Solicitação de nova funcionalidade",
        priority: "Low",
        status: "Cancelled",
        description: "",
      },
      {
        id: 4,
        code: "TCK-004",
        title: "Problemas com o login",
        priority: "Higth",
        status: "Pedding",
        description: "",
      },
      {
        id: 5,
        code: "TCK-005",
        title: "Erro no envio de e-mails automáticos",
        priority: "Medium",
        status: "Conpleted",
        description: "",
      },
      {
        code: "TCK-006",
        id: 1,
        priority: "Higth",
        status: "Conpleted",
        title: "Instalação do Primavera",
        description: "",
      },
    ]);
    setTimeout(() => {
      setLoad(false);
    }, 4000);
  }, []);
  return (
    <main className="flex pt-[10px] flex-col gap-4 mt-[50px] lg:mt-0">
      {add && (
        <article
          data-aos="zoom-in"
          id="transparent"
          className="fixed z-[999999] h-full w-full lg:w-[85%] p-5 "
        >
          <form
            action=""
            className="border p-3 rounded-sm border-orange-400 w-[90%] lg:w-[40%] flex flex-col gap-3"
          >
            <h1 className="text-[20px] font-bold">Criar Solicitação</h1>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              placeholder="entre com o título da solicitação"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />{" "}
            <label htmlFor="priority">Prioridade</label>
            <select
              name=""
              id="priority"
              className="border p-2 rounded-sm border-orange-400 outline-0"
            >
              <option value="0">Selecione a prioridade</option>
              <option value="1">Alta</option>
              <option value="2">Média</option>
              <option value="3">Baixa</option>
            </select>
            <label htmlFor="area">Categoria</label>
            <select
              name=""
              id="area"
              className="border p-2 rounded-sm border-orange-400 outline-0"
            >
              <option value="0">Selecione uma área</option>
              <option value="1">TI</option>
              <option value="2">Desing</option>
              <option value="3">Market</option>
            </select>
            <label htmlFor="date">Data final</label>
            <input
              type="date"
              id="date"
              placeholder="entre com o título da solicitação"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />{" "}
            <label htmlFor="desc">Descrição</label>
            <textarea
              id="desc"
              placeholder="entre com o título da solicitação"
              className="border p-2 rounded-sm outline-0 resize-none  border-orange-400"
            />
            <footer className="flex lg:flex-row flex-col items-center justify-between gap-2">
              <button className="bg-orange-400 text-white  border-orange-400 rounded-full p-[5px] w-full">
                Cadastrar
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdd(false);
                }}
                className="bg-red-500 text-white  border-orange-400 rounded-full p-[5px] w-full"
              >
                Cancelar
              </button>
            </footer>
          </form>
        </article>
      )}
      {edit && (
        <article
          data-aos="zoom-in"
          id="transparent"
          className="fixed z-[999999] h-full w-full lg:w-[85%] p-5 "
        >
          <form
            action=""
            className="border p-3 rounded-sm border-orange-400 w-[90%] lg:w-[40%] flex flex-col gap-3"
          >
            <h1 className="text-[20px] font-bold">Actualizar Solicitação</h1>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              value={active.title}
              onChange={(e) => {
                setactive((prev) => ({ ...prev, title: e.target.value }));
              }}
              id="title"
              placeholder="entre com o título da solicitação"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />{" "}
            <label htmlFor="desc">Descrição</label>
            <textarea
              value={active.description}
              onChange={(e) => {
                setactive((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              id="desc"
              placeholder="entre com o título da solicitação"
              className="border p-2 rounded-sm outline-0 resize-none  border-orange-400"
            />
            <footer className="flex lg:flex-row flex-col items-center justify-between gap-2">
              <button className="bg-orange-400 text-white  border-orange-400 rounded-full p-[5px] w-full">
                Actualizar
              </button>
              <button
                type="button"
                onClick={() => {
                  setEdit(false);
                }}
                className="bg-red-500 text-white  border-orange-400 rounded-full p-[5px] w-full"
              >
                Cancelar
              </button>
            </footer>
          </form>
        </article>
      )}

      <header className="w-full flex center items-center  justify-end gap-[5px] p-[10px] pt-[20px] lg:sticky lg:top-0 bg-white lg:z-10">
        <button
          className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px] w-[120px]"
          onClick={() => {
            setAdd(true);
          }}
        >
          <PlusCircle size={iconSize.iconSize} />
          Nova
        </button>
      </header>
      <article className="flex flex-col gap-9 border p-3  rounded-sm h-full mb-2 ">
        <header className="flex  flex-col justify-between items-center gap-5 lg:flex-row">
          <SearchBar onClick={() => {}} placeholder="Ticket da Solicitação" />
          <SelectchBar
            onClick={() => {}}
            placeholder="Filtar por estado ou prioridade"
            values={category}
          />

          <SelectchBar
            onClick={() => {}}
            placeholder="Filtar por categoria"
            values={[
              {
                id: 1,
                text: "TI",
              },
              {
                id: 1,
                text: "Market",
              },
              {
                id: 1,
                text: "Pedreira",
              },
            ]}
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
                      <button
                        className="flex gap-[5px] items-center justify-center p-[7px] border text-purple rounded-[5px] text-[13px] w-[30px]"
                        onClick={() => {
                          router.push(`/admin/ticket/${data.id}`);
                        }}
                      >
                        <Eye size={iconSize.iconSize} />
                      </button>
                      <button
                        className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px] w-[30px]"
                        onClick={() => {
                          setEdit(true);
                          setactive(data);
                        }}
                      >
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
