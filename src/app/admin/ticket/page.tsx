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
  Search,
  ToggleRight,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ClipLoader, SyncLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import getALLTicket, {
  createTicketSave,
  deleteTicketById,
  getAllTicktByID,
  getAllTicktByPrioritt,
  getAllTicktByStatus,
  updateTicket,
} from "@/services/tikect";

import "react-toastify/ReactToastify.css";

import { toast, ToastContainer } from "react-toastify";
import getAllSectors from "@/services/sector";
import RedirectToLogin from "@/services/redirect";
export default function Ticket() {
  const [load, setLoad] = useState(true);
  const data: Pick<
    ITicket,
    "title" | "code" | "priority" | "id" | "status" | "description"
  > = {
    code: "",
    id: 0,
    priority: "High",
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
    priority: "High",
    status: "Cancelled",
    title: "",
    description: "",
  });
  const [Ticket, setTicket] = useState<(typeof data)[]>([]);
  const [page, setPage] = useState(1);
  const [lastpage, setLastPage] = useState(1);
  const [PriotityFulter, setPriotityFulter] = useState("none");
  const [StatusFulter, setStatusFulter] = useState("none");
  const [id, setId] = useState("none");
  const [sectors, setSectors] = useState<any[]>([]);
  const router = useRouter();
  const [addError, setAdErro] = useState("");
  const [addSucess, setAddSUcess] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [reload, setReoad] = useState(true);
  useEffect(() => {
    async function getSectrs() {
      const data = await getAllSectors();
      setSectors(data?.data);
    }
    getSectrs();
  }, []);
  useEffect(() => {
    if (PriotityFulter == "none") {
      return;
    } else {
      setLoad(true);
      async function getTicketByPriority(page: number, priority: any) {
        const data = await getAllTicktByPrioritt(page, priority);
        setTicket(data?.data);
        setLastPage(data?.lastPage);
        setTimeout(() => {
          setLoad(false);
        }, 4000);
      }
      getTicketByPriority(page, PriotityFulter);
    }
  }, [PriotityFulter, page]);

  useEffect(() => {
    if (StatusFulter == "none") {
      return;
    } else {
      setLoad(true);
      async function getTaskByStatus(page: number, status: any) {
        const data = await getAllTicktByStatus(page, status);
        setTicket(data?.data);
        setLastPage(data?.lastPage);
        setTimeout(() => {
          setLoad(false);
        }, 4000);
      }
      getTaskByStatus(page, StatusFulter);
    }
  }, [StatusFulter, page]);

  useEffect(() => {
    if (id == "none") {
      return;
    } else {
      setLoad(true);
      async function getTaskByStatus() {
        const data = await getAllTicktByID(id);
        setTicket(data?.ticket ? [data?.ticket] : []);
        setLastPage(data?.ticket ? 1 : 0);
        setTimeout(() => {
          setLoad(false);
        }, 4000);
      }
      getTaskByStatus();
    }
  }, [id]);

  useEffect(() => {
    if (PriotityFulter != "none" || StatusFulter != "none" || id != "none") {
      return;
    }
    setLoad(true);
    async function getAllTikckets() {
      const data = await getALLTicket(page);
      console.log(data);
      setTicket(data?.data);
      setLastPage(data?.lastPage);
      setTimeout(() => {
        setLoad(false);
      }, 4000);
    }
    getAllTikckets();
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      offset: 40,
    });
  }, [page, PriotityFulter, StatusFulter, id, reload]);

  async function createTicket(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title") as string;
    const description = form.get("desc") as string;
    const finished = form.get("date") as string;
    const sector = form.get("sector") as string;
    const priority = form.get("priority") as "Low" | "Medium" | "High";

    if (!title || title.trim().length < 10) {
      setAdErro("Título deve conter pelo menos 10 caracteres.");
      setTimeout(() => setAdErro(""), 3000);
      return;
    }

    if (!finished || isNaN(Date.parse(finished))) {
      setAdErro("Data inválida ou não fornecida.");
      setTimeout(() => setAdErro(""), 3000);
      return;
    }

    const finishedDate = new Date(finished);
    const now = new Date();
    if (finishedDate < now) {
      setAdErro("A data de conclusão não pode ser anterior a hoje.");
      setTimeout(() => setAdErro(""), 3000);
      return;
    }

    const validPriorities = ["Low", "Medium", "High"];
    if (!validPriorities.includes(priority)) {
      setAdErro("Prioridade inválida");
      setTimeout(() => setAdErro(""), 3000);
      return;
    }
    setAddLoading(true);
    setAdErro("");
    const Ticket = {
      title,
      description,
      finished: finishedDate,
      sector: Number(sector),
      priority,
    };
    const created = await createTicketSave({
      fineshed: Ticket.finished,
      priotity: Ticket.priority,
      title: Ticket.title,
      description: Ticket.description,
      sectorid: Ticket.sector,
    });
    if (created) {
      setTimeout(() => {
        setAddLoading(false);
        setAddSUcess("Sector craido com sucesso");
      }, 3000);
      setTimeout(() => setAddSUcess(""), 6000);
    } else {
      setAdErro("Erro ao criar o Sector");
      setAddLoading(false);
      setTimeout(() => setAdErro(""), 3000);
    }
  }

  async function editTicket(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!active.title || active.title.trim().length < 10) {
      setAdErro("Título deve conter pelo menos 10 caracteres.");
      setTimeout(() => setAdErro(""), 3000);
      return;
    }

    setAddLoading(true);
    setAdErro("");
    const Ticket = {
      title: active.title,
      description: active.description,
      id: active.id,
    };
    const update = await updateTicket({
      title: Ticket.title,
      description: Ticket.description,
      id: Ticket.id,
    });
    if (update) {
      setTimeout(() => {
        setAddLoading(false);
        setAddSUcess("Ticket actualizar com sucesso");
      }, 3000);
      setTimeout(() => setAddSUcess(""), 6000);
    } else {
      setTimeout(() => {
        setAdErro("Erro ao actualizar o Ticket");
        setAddLoading(false);
      }, 3000);
      setTimeout(() => setAdErro(""), 6000);
    }
  }
  return (
    <main className="flex pt-[10px] flex-col gap-4 mt-[50px] lg:mt-0">
      <ToastContainer />
      {add && (
        <article
          data-aos="zoom-in"
          id="transparent"
          className="fixed z-[999999] h-full w-full lg:w-[85%] p-5 "
        >
          <form
            onSubmit={createTicket}
            className="border p-3 rounded-sm border-orange-400 w-[90%] lg:w-[40%] flex flex-col gap-3"
          >
            <h1 className="text-[20px] font-bold">Criar Solicitação</h1>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="entre com o título da solicitação"
              className="border p-2 rounded-sm outline-0  border-orange-400"
              required
            />{" "}
            <label htmlFor="priority">Prioridade</label>
            <select
              name="priority"
              id="priority"
              className="border p-2 rounded-sm border-orange-400 outline-0"
              required
            >
              <option value="">Selecione a prioridade</option>{" "}
              <option value={"High"}>Alta</option>{" "}
              <option value={"Medium"}>Média</option>{" "}
              <option value={"Low"}>Baixa</option>
            </select>
            <label htmlFor="sector">Categoria</label>
            <select
              name="sector"
              id="sector"
              required
              className="border p-2 rounded-sm border-orange-400 outline-0"
            >
              <option value="0">Selecione uma área</option>
              {Array.isArray(sectors) &&
                sectors.length &&
                sectors.map((sect, key) => (
                  <option value={sect?.id} key={key}>
                    {sect?.title}
                  </option>
                ))}
            </select>
            <label htmlFor="date">Data final</label>
            <input
              type="date"
              id="date"
              required
              name="date"
              placeholder="entre com o título da solicitação"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />{" "}
            <label htmlFor="desc">Descrição</label>
            <textarea
              id="desc"
              name="desc"
              placeholder="entre com o título da solicitação"
              className="border p-2 rounded-sm outline-0 resize-none  border-orange-400"
            />
            <footer className="flex lg:flex-row flex-col items-center justify-between gap-2">
              <button
                className="bg-orange-400 text-white  border-orange-400 rounded-full p-[5px] w-full"
                type="submit"
              >
                Cadastrar
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdd(false);
                  setPage(1);
                  setId("none");
                  setPriotityFulter("none");
                  setStatusFulter("none");
                  setReoad((prev) => !prev);
                }}
                className="bg-red-500 text-white  border-orange-400 rounded-full p-[5px] w-full"
              >
                Fechar
              </button>
            </footer>
            <p className="text-center text-red-400">{addError}</p>
            <p className="text-center text-green-400">{addSucess}</p>
            {addLoading && (
              <ClipLoader className="flex place-self-center" color="orange" />
            )}
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
            onSubmit={editTicket}
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
              <button
                className="bg-orange-400 text-white  border-orange-400 rounded-full p-[5px] w-full"
                type="submit"
              >
                Actualizar
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdd(false);
                  setPage(1);
                  setId("none");
                  setPriotityFulter("none");
                  setStatusFulter("none");
                  setReoad((prev) => !prev);
                }}
                className="bg-red-500 text-white  border-orange-400 rounded-full p-[5px] w-full"
              >
                Fechar
              </button>
            </footer>
            <p className="text-center text-red-400">{addError}</p>
            <p className="text-center text-green-400">{addSucess}</p>
            {addLoading && (
              <ClipLoader className="flex place-self-center" color="orange" />
            )}
          </form>
        </article>
      )}

      <header className="w-full lg:flex-row flex-col flex center items-center  justify-end gap-[5px] p-[10px] pt-[20px] lg:sticky lg:top-0 bg-white lg:z-10">
        <button
          className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px] w-[120px]"
          onClick={() => {
            setAdd(true);
          }}
        >
          <PlusCircle size={iconSize.iconSize} />
          Nova
        </button>
        {(id !== "none" ||
          PriotityFulter !== "none" ||
          StatusFulter !== "none") && (
          <button
            className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-red-400 rounded-[5px] text-[13px] w-[120px]"
            onClick={() => {
              setId("none");
              setPriotityFulter("none");
              setStatusFulter("none");
            }}
          >
            Limpar Filtros
          </button>
        )}
      </header>
      <article className="flex flex-col gap-9 border p-3  rounded-sm h-full mb-2 ">
        <header className="flex  flex-col justify-between items-center gap-5 lg:flex-row">
          <div
            id="searchBar"
            className="flex items-center border p-[5px] w-[100%] justify-between rounded-[5px]"
          >
            <input
              placeholder={"Ticket da Solicitação"}
              name="search"
              id="search"
              onChange={(e) => {
                setTimeout(() => {
                  if (e.target.value.length == 0) {
                    setId("none");
                  } else {
                    setId(e.target.value);
                  }
                  setPriotityFulter("none");
                  setStatusFulter("none");
                }, 500);
              }}
              type="text"
              className="w-[90%] h-full border-o outline-0"
            />
            <button
              className=" bg-orange-400 text-white h-full rounded-[5px] p-[5px] w-[10%] flex justify-center items-center"
              onClick={() => {}}
            >
              <Search size={iconSize.iconSize} />
            </button>
          </div>
          <div className="flex items-center border p-[5px] w-[100%] justify-between rounded-[5px]">
            <select
              name="search"
              id="search"
              onChange={(e) => {
                setTimeout(() => {
                  setId("none");
                  setPriotityFulter(e.target.value);
                  setStatusFulter("none");
                }, 500);
              }}
              className="w-[100%] h-full border-o outline-0"
            >
              <option value={"none"}>Selecionar por prioridade</option>
              <option value={"High"}>Alta</option>{" "}
              <option value={"Medium"}>Média</option>{" "}
              <option value={"Low"}>Baixa</option>
            </select>{" "}
            <button
              className=" bg-orange-400 text-white h-full rounded-[5px] p-[5px] w-[10%] flex justify-center items-center"
              onClick={() => {}}
            >
              <Search size={iconSize.iconSize} />
            </button>
          </div>
          <div className="flex items-center border p-[5px] w-[100%] justify-between rounded-[5px]">
            <select
              name="search"
              id="search"
              onChange={(e) => {
                setTimeout(() => {
                  setId("none");
                  setStatusFulter(e.target.value);
                  setPriotityFulter("none");
                }, 500);
              }}
              className="w-[100%] h-full border-o outline-0"
            >
              <option value={"none"}>Selecionar por estado</option>
              <option value={"Pending"}>Pendente</option>{" "}
              <option value={"Completed"}>Concluída</option>{" "}
              <option value={"Working"}>Em progresso</option>{" "}
              <option value={"Cancelled"}>Cancelada</option>
            </select>{" "}
            <button
              className=" bg-orange-400 text-white h-full rounded-[5px] p-[5px] w-[10%] flex justify-center items-center"
              onClick={() => {}}
            >
              <Search size={iconSize.iconSize} />
            </button>
          </div>
        </header>
        {load ? (
          <div className="h-full flex justify-center items-center">
            <SyncLoader size={7} color="orange" />
          </div>
        ) : (
          <>
            {!Array.isArray(Ticket) || Ticket?.length == 0 ? (
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
                {Array.isArray(Ticket) &&
                  Ticket?.length > 0 &&
                  Ticket?.map((data, key) => (
                    <span
                      id="grid"
                      data-aos="fade-up"
                      className="p-2 rounded-sm flex justify-between    w-full border  transition-all duration-200 ease-in-out hover:cursor-pointer flex-col lg:flex-row lg:h-[40px] lg:items-center gap-[10px]"
                      key={key}
                    >
                      <p>TCK-{data.id}</p>
                      <p className="w-[100px] ">
                        {data.title?.slice(0, 50)} ...
                      </p>
                      <p>
                        {data.status == "Completed" ? (
                          <span className="text-green-500">Concluído</span>
                        ) : data.status == "Cancelled" ? (
                          <span className="text-red-500">Cancelado</span>
                        ) : (
                          <span className="text-yellow-500">Pendente</span>
                        )}
                      </p>
                      <p>
                        {data.priority == "High" ? (
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
                        <button
                          className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-red-400 rounded-[5px] text-[13px] w-[30px]"
                          onClick={async () => {
                            const deleted = await deleteTicketById(
                              String(data.id)
                            );
                            if (deleted && Array.isArray(Ticket)) {
                              const newList = Ticket.filter(
                                (ticket) => ticket?.id !== data.id
                              );
                              setTicket(newList);
                            } else {
                              toast.error("Erro ao deletar");
                            }
                          }}
                        >
                          <Trash size={iconSize.iconSize} />
                        </button>
                      </div>
                    </span>
                  ))}
              </aside>
            )}
          </>
        )}
        {id == "none" && (
          <footer className="flex justify-between items-center border-t pt-2">
            <p>
              {page} de {lastpage}
            </p>
            <span className="flex justify-between items-center gap-1">
              <button
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
                disabled={page === 1}
                className={`flex gap-[5px] items-center justify-center p-[7px] text-white rounded-[5px] text-[13px] w-[30px] ${
                  page === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-400"
                }`}
              >
                <ArrowLeft size={iconSize.iconSize} />
              </button>

              <button
                onClick={() => {
                  if (page < lastpage) setPage(page + 1);
                }}
                disabled={page === lastpage}
                className={`flex gap-[5px] items-center justify-center p-[7px] text-white rounded-[5px] text-[13px] w-[30px] ${
                  page === lastpage
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-400"
                }`}
              >
                <ArrowRight size={iconSize.iconSize} />
              </button>
            </span>
          </footer>
        )}
      </article>
    </main>
  );
}
