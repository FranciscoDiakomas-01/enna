"use client";
import "./index.css";
import AOS from "aos";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { ArrowLeft, ArrowRight, PlusCircle, Search } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import CardTech from "@/components/CardTech";
import iconSize from "@/constants/iconSize";
import {
  createUserSave,
  deleteUserById,
  getAlluser,
  getAlluserByPattern,
} from "@/services/users";
import IUserAPI from "@/types/userAPI";
import getAllSectors from "@/services/sector";
import { ClipLoader } from "react-spinners";
export default function Tech() {
  const [users, setUsers] = useState<IUserAPI[]>([]);
  const [loader, setLoader] = useState(true);
  const [add, setAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [lastpage, setLastPage] = useState(1);
  const [realod, setReload] = useState(false);
  const [sectors, setSectors] = useState<any[]>([]);
  const [addError, setAdErro] = useState("");
  const [addSucess, setAddSUcess] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [pattern, setPattern] = useState("none");
  useEffect(() => {
    async function get() {
      const data = await getAllSectors();
      setSectors(data?.data);
    }
    get();
  }, [realod]);

  useEffect(() => {
    if (pattern == "none") {
      return;
    }
    setLoader(true);
    async function get() {
      const data = await getAlluserByPattern(String(page), pattern);
      setTimeout(() => {
        setUsers(data?.data);
        setLastPage(data?.lastPage);
        setPage(data?.page);
        setLoader(false);
      }, 4000);
    }
    get();
  }, [pattern]);

  useEffect(() => {
    if (pattern != "none") {
      return;
    }
    setLoader(true);
    async function get() {
      const data = await getAlluser(String(page));
      setTimeout(() => {
        setUsers(data?.data);
        setLastPage(data?.lastPage);
        setPage(data?.page);
        setLoader(false);
      }, 4000);
    }
    get();
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      offset: 200,
    });
  }, [page, realod, pattern]);

  async function createUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const lastname = form.get("lastname") as string;
    const email = form.get("email") as string;
    const tel = form.get("Telefone") as string;
    const sectorId = form.get("area") as string;
    const bio = form.get("bio") as string;

    const User = {
      name,
      lastname,
      email,
      tel,
      sectorId,
      bio,
    };
    if (!User || !name || !lastname || !tel || !sectorId) {
      setAdErro("Preenche todos os campos obrigatórios");
      setTimeout(() => setAdErro(""), 3000);
      return;
    }
    setAddLoading(true);
    setAdErro("");
    const created = await createUserSave({
      name,
      lastname,
      email,
      tel,
      sectorid: +sectorId,
      bio,
    });
    if (created) {
      setTimeout(() => {
        setAddLoading(false);
        setAddSUcess("Usuário craido com sucesso");
      }, 3000);
      setTimeout(() => setAddSUcess(""), 6000);
    } else {
      setAdErro("Erro ao criar o Usuário");
      setAddLoading(false);
      setTimeout(() => setAdErro(""), 3000);
    }
  }
  return (
    <main className="pt-[40px] flex flex-col gap-4">
      {add && (
        <article
          data-aos="zoom-in"
          id="transparent"
          className="fixed z-[999999] h-full w-full lg:w-[85%] p-5 "
        >
          <form
            action=""
            onSubmit={createUser}
            className="border p-3 rounded-sm border-orange-400 w-[90%] lg:w-[40%] flex flex-col gap-2"
          >
            <h1 className="text-[20px] font-bold">Criar Funcionário</h1>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="entre com o nome"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />
            <label htmlFor="lastname">Sobrenome</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              required
              placeholder="entre com o sobrenome"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="exemplo@dominio.com"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />
            <label htmlFor="Telefone">Telefone</label>
            <input
              type="tel"
              id="Telefone"
              name="Telefone"
              required
              placeholder="xxx xxx xxx"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />
            <label htmlFor="area">Sector</label>
            <select
              name="area"
              id="area"
              required
              className="border p-2 rounded-sm border-orange-400 outline-0"
            >
              <option value="0">Selecione uma área</option>
              {Array.isArray(sectors) &&
                sectors.length > 0 &&
                sectors.map((data, key) => (
                  <option value={data?.id} key={key}>
                    {data?.title}
                  </option>
                ))}
            </select>
            <label htmlFor="bio">Biografia</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Breve descrição"
              className="border p-2 rounded-sm outline-0  border-orange-400 resize-none"
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
                  setReload((prev) => !prev);
                }}
                className="bg-red-500 text-white  border-orange-400 rounded-full p-[5px] w-full"
              >
                Cancelar
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
      <header className="w-full flex flex-col lg:flex-row center lg:items-center  justify-between gap-[10px] p-[10px] pt-[20px] lg:sticky top-0 bg-white z-10 mt-[45px] lg:mt-0">
        <div className="lg:w-[50%] w-full">
          <div
            id="searchBar"
            className="flex items-center border p-[5px] w-[100%] justify-between rounded-[5px]"
          >
            <input
              placeholder={"Busque por funcionários"}
              name="search"
              id="search"
              type="text"
              className="w-[90%] h-full border-o outline-0"
              onChange={(e) => {
                setTimeout(() => {
                  setPage(1);
                  if (e.target.value.length == 0) {
                    setPattern("none");
                  } else {
                    setPattern(e.target.value);
                  }
                }, 500);
              }}
            />
            <button
              className=" bg-orange-400 text-white h-full rounded-[5px] p-[5px] w-[10%] flex justify-center items-center"
              onClick={() => {}}
            >
              <Search size={iconSize.iconSize} />
            </button>
          </div>
        </div>
        <button
          className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px]"
          onClick={() => {
            setAdd(true);
          }}
        >
          <PlusCircle size={14} />
          Adicionar
        </button>
      </header>
      {pattern !== "none" && (
        <button
          className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-red-400 rounded-[5px] text-[13px] w-[120px]"
          onClick={() => {
            setPattern("none");
          }}
        >
          Limpar Filtros
        </button>
      )}
      {loader ? (
        <section className="grid grid-cols-1 gap-[20px] pt-[10px] lg:grid-cols-3 md:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <figure key={index}>
              <Skeleton height={200} width="100%" />
              <Skeleton count={5} height={10} width="100%" />
            </figure>
          ))}
        </section>
      ) : (
        <>
          {Array.isArray(users) && users.length > 0 ? (
            <>
              {" "}
              <section className="grid grid-cols-1 gap-[20px] pt-[10px] lg:grid-cols-3 md:grid-cols-2 lg:mb-0 mb-4 overflow-hidden ">
                {users.map((data, index) => (
                  <CardTech
                    tech={data}
                    key={index}
                    onDelete={async () => {
                      const deleted = await deleteUserById(data?.id);
                      if (deleted) {
                        const newList = users.filter((user) => {
                          return user.id != data.id && user;
                        });
                        setUsers(newList);
                        setReload((prev) => !prev);
                      }
                    }}
                  />
                ))}
              </section>
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
            <section className="min-h-[50dvh] flex flex-col gap-[30px] justify-center items-center">
              <p className="text-gray-500">Sem funcionários cadastrado</p>
            </section>
          )}
        </>
      )}
    </main>
  );
}
