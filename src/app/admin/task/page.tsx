"use client";
import iconSize from "@/constants/iconSize";
import { useEffect, useState } from "react";
import { ClipLoader, SyncLoader } from "react-spinners";
import TaskCard from "@/components/Task";
import { ArrowLeft, ArrowRight, PlusCircle, Search } from "lucide-react";
import {
  createTaskSave,
  getAllTask,
  getAllTaskBySearch,
  getAllTaskByStatus,
} from "@/services/task";
import { getAlluserNames } from "@/services/users";
export default function Tasks() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("none");
  const [search, setSrchea] = useState("none");
  const [lastpage, setLastPage] = useState(1);
  const [users, setUsers] = useState<any[]>([]);

  const [addError, setAdErro] = useState("");
  const [addSucess, setAddSUcess] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [reload, setReoad] = useState(true);

  useEffect(() => {
    async function getAllFunc() {
      const data = await getAlluserNames();
      setUsers(data?.data);
    }
    getAllFunc();
  }, []);
  useEffect(() => {
    if (status == "none") {
      return;
    }
    setLoading(true);
    async function getTaskByStatus() {
      const data = await getAllTaskByStatus(String(page), status);
      setTasks(data?.data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    getTaskByStatus();
  }, [status]);

  useEffect(() => {
    if (status != "none" || search != "none") {
      return;
    }
    setLoading(true);
    async function get() {
      const data = await getAllTask(String(page));
      setTasks(data?.data);
      setPage(data?.page);
      setLastPage(data?.lastPage);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    get();
  }, [status, page, search, reload]);

  useEffect(() => {
    if (search == "none") {
      return;
    }
    setLoading(true);
    async function get() {
      const data = await getAllTaskBySearch(String(page), search);
      setTasks(data?.data);
      setPage(data?.page);
      setLastPage(data?.lastPage);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    get();
  }, [search]);

  async function createTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title") as string;
    const description = form.get("desc") as string;
    const ticketid = form.get("Ticket") as string;
    const owerId = form.get("owner") as string;

    if (!ticketid || !owerId || !title) {
      setAdErro("Preencha os campos obrigatórios");
      setTimeout(() => setAdErro(""), 3000);
      return;
    }

    setAddLoading(true);
    setAdErro("");
    const Task = {
      title,
      description,
      owerId: Number(owerId),
      ticketid: Number(ticketid),
    };
    const created = await createTaskSave(Task);
    if (created) {
      setTimeout(() => {
        setAddLoading(false);
        setAddSUcess("Tarefa craido com sucesso");
      }, 3000);
      setTimeout(() => setAddSUcess(""), 6000);
    } else {
      setTimeout(() => {
        setAdErro("Erro ao criar a Tarefa");
        setAddLoading(false);
      }, 3000);
      setTimeout(() => setAdErro(""), 6000);
    }
  }
  return (
    <main>
      <header className="w-full flex flex-col center items-center  justify-between gap-[5px] p-[10px] pt-[20px] lg:sticky top-15 mt-25 lg:mt-0  bg-white z-10 lg:top-0 lg:flex-row">
        <div
          id="searchBar"
          className="flex items-center border p-[5px] w-[100%] justify-between rounded-[5px]"
        >
          <input
            placeholder={"Busque por tarefas"}
            name="search"
            id="search"
            onChange={(e) => {
              setTimeout(() => {
                if (e.target.value.length == 0) {
                  setSrchea("none");
                } else {
                  setSrchea(e.target.value);
                }
                setStatus("none");
                setPage(1);
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
                setStatus(e.target.value);
                setSrchea("none");
                setPage(1);
              }, 500);
            }}
            className="w-[100%] h-full border-o outline-0"
          >
            <option value={"none"}>Selecionar por estado</option>
            <option value={"Completed"}>Concluída</option>{" "}
            <option value={"Pending"}>Pendente</option>{" "}
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
      {add && (
        <div className=" fixed h-full w-full lg:w-[85%] p-5 right-0 bottom-0 items-center justify-center flex bg-white z-20">
          <form
            action=""
            onSubmit={createTask}
            className="border p-3 rounded-sm border-orange-400 w-[90%] lg:w-[40%] flex flex-col gap-2"
          >
            <h1 className="text-[20px] font-bold">Criar Tarefa</h1>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="entre com o título da tarefa"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />{" "}
            <label htmlFor="Ticket">Ticket</label>
            <input
              type="number"
              name="Ticket"
              id="Ticket"
              required
              placeholder="entre com o ticket da tarefa"
              className="border p-2 rounded-sm border-orange-400 outline-0"
            />
            <label htmlFor="owner">Funcionário</label>
            <select
              name="owner"
              id="owner"
              className="border p-2 rounded-sm border-orange-400 outline-0"
            >
              <option value="">Selecione um funcionário</option>
              {Array.isArray(users) &&
                users?.length > 0 &&
                users.map((u, key) => (
                  <option key={key} value={u?.id}>
                    {u?.name} {u?.lastname}
                  </option>
                ))}
            </select>
            <label htmlFor="desc">Descrição</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="entre com o título da tarefa"
              className="border p-2 rounded-sm outline-0 resize-none  border-orange-400"
            />
            <button className="bg-orange-400 text-white  border-orange-400 rounded-full p-2">
              Cadastrar
            </button>
            <p className="text-center text-red-400">{addError}</p>
            <p className="text-center text-green-400">{addSucess}</p>
            {addLoading && (
              <ClipLoader className="flex place-self-center" color="orange" />
            )}
          </form>
        </div>
      )}
      {(status !== "none" || search !== "none") && (
        <button
          className="flex gap-[5px] items-center justify-center p-[7px] mt-4 text-white bg-red-400 rounded-[5px] text-[13px] w-[120px]"
          onClick={() => {
            setStatus("none");
            setSrchea("none");
          }}
        >
          Limpar Filtros
        </button>
      )}
      <button
        className=" fixed flex gap-[5px] items-center justify-center text-white bg-orange-400  text-[13px]  rounded-full w-[40px] h-[40px] bottom-3 right-2 z-[9999] cursor-pointer"
        onClick={() => {
          if (add) {
            setReoad((prev) => !prev);
          }
          setAdd((prev) => !prev);
        }}
      >
        {add ? "-" : <PlusCircle size={iconSize.iconSize} />}
      </button>
      {loading ? (
        <div className="flex center items-center justify-center h-[calc(100vh-60px)]">
          <SyncLoader size={7} color="orange" />
        </div>
      ) : (
        <>
          {tasks.length > 0 ? (
            <>
              <aside className="grid grid-cols-1 gap-5 p-[10px] lg:grid-cols-3 overflow-hidden">
                {tasks.map((task, index) => (
                  <TaskCard key={index} task={task} admin />
                ))}
              </aside>
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
            </>
          ) : (
            <div className="w-full flex center items-center justify-center h-[calc(100vh-60px)]">
              <span className="text-gray-500">Nenhuma tarefa encontrada</span>
            </div>
          )}
        </>
      )}
    </main>
  );
}
