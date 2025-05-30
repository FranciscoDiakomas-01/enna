"use client";
import SearchBar from "@/components/SearchBar";
import "./index.css";
import AOS from "aos";

interface ISector {
  description: string;
  id: number;
  title: string;
  total: 0;
  _count: { users: number };
}
import "aos/dist/aos.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Edit, PlusCircle, Trash, Users } from "lucide-react";
import { useEffect, useState } from "react";
import iconSize from "@/constants/iconSize";
import getAllSectors, {
  createSector,
  deteleteSector,
  updateSector,
} from "@/services/sector";
import { ClipLoader } from "react-spinners";
export default function Category() {
  const [load, setLoad] = useState(true);
  const [category, setCategory] = useState<ISector[]>([]);
  const [add, setAdd] = useState(false);

  const [addError, setAdErro] = useState("");
  const [addSucess, setAddSUcess] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [reload, setReoad] = useState(true);
  const [active, setActive] = useState<ISector>({
    id: 0,
    title: "",
    description: "",
    _count: { users: 0 },
    total: 0,
  });
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setLoad(true);

    async function get() {
      const secotrs = await getAllSectors();
      setCategory(secotrs?.data);
      setTimeout(() => {
        setLoad(false);
      }, 3000);
    }
    get();
    AOS.init({
      once: true,
      offset: 70,
      duration: 1000,
    });
  }, [reload]);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title") as string;
    const description = form.get("desc") as string;

    if (!title || title.trim().length < 2) {
      setAdErro("Título deve conter pelo menos 10 caracteres.");
      setTimeout(() => setAdErro(""), 3000);
      return;
    }

    setAddLoading(true);
    setAdErro("");
    const Sector = {
      title,
      description,
    };
    const created = await createSector(Sector);
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

  async function update(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.preventDefault();
    if (!active?.title || active?.title.trim().length < 2) {
      setAdErro("Título deve conter pelo menos 10 caracteres.");
      setTimeout(() => setAdErro(""), 3000);
      return;
    }

    setAddLoading(true);
    setAdErro("");
    const Sector = {
      title: active?.title,
      description: active?.description,
      id: active?.id,
    };
    const created = await updateSector(Sector);
    if (created) {
      setTimeout(() => {
        setAddLoading(false);
        setAddSUcess("Sector actualizado com sucesso");
      }, 3000);
      setTimeout(() => setAddSUcess(""), 6000);
    } else {
      setAdErro("Erro ao actualizar o Sector");
      setAddLoading(false);
      setTimeout(() => setAdErro(""), 3000);
    }
  }
  return (
    <main className="flex flex-col gap-7">
      {add && (
        <article
          id="transparent"
          data-aos="zoom-in"
          className="fixed z-[999] h-full w-full lg:w-[85%] p-5 "
        >
          <form
            action=""
            onSubmit={create}
            className="border p-3 rounded-sm border-orange-400 w-[90%] lg:w-[40%] flex flex-col gap-2"
          >
            <h1 className="text-[20px] font-bold">Criar Sector</h1>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="entre com o título da tarefa"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />{" "}
            <label htmlFor="desc">Descrição</label>
            <textarea
              id="desc"
              name="desc"
              placeholder="entre com o título da tarefa"
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
            onSubmit={update}
            className="border p-3 rounded-sm border-orange-400 w-[90%] lg:w-[40%] flex flex-col gap-3"
          >
            <h1 className="text-[20px] font-bold">Actualizar Sector</h1>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              value={active.title}
              onChange={(e) => {
                setActive((prev) => ({ ...prev, title: e.target.value }));
              }}
              id="title"
              placeholder="entre com o título da categoria"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />{" "}
            <label htmlFor="desc">Descrição</label>
            <textarea
              value={active.description}
              onChange={(e) => {
                setActive((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              id="desc"
              placeholder="entre com o título da categoria"
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
                  setReoad((prev) => !prev);
                  setEdit(false);
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
      <header className="flex flex-col md:flex-row lg:flex-row justify-between items-center md:items-start lg:items-start gap-3 pt-[70px] lg:pt-0">
        <button
          className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px] w-full md:w-[100px] lg:w-[100px]"
          onClick={() => {
            setAdd(true);
          }}
        >
          <PlusCircle size={14} />
          Adicionar
        </button>
      </header>

      {load ? (
        <aside className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-4 lg:mb-0">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
            <div key={index}>
              <Skeleton height={140} />
              <Skeleton count={3} />
            </div>
          ))}
        </aside>
      ) : (
        <>
          {Array.isArray(category) && category.length > 0 ? (
            <aside className="grid lg:grid-cols-3  overflow-hidden md:grid-cols-2 grid-cols-1 gap-4 mb-4 lg:mb-0">
              {category.map((data, index) => (
                <figure
                  data-aos="fade-up"
                  key={index}
                  className="border p-3 flex flex-col gap-3 rounded-sm "
                >
                  <h1 className="font-bold text-[15px]">{data.title}</h1>
                  <h2 className="flex justify-center items-center p-[2px] rounded-full bg-green-300 text-green-600 w-[70px]">
                    <Users size={iconSize.iconSize} />
                    {data?._count?.users}
                  </h2>
                  <p>{data.description}</p>
                  <footer className="flex items-center gap-3">
                    <button
                      className="bg-orange-400 text-white w-[40px] p-2 rounded-sm"
                      onClick={() => {
                        setEdit(true);
                        setActive(data);
                      }}
                    >
                      <Edit size={iconSize.iconSize} />
                    </button>
                    <button
                      className="bg-red-500 text-white w-[40px] p-2 rounded-sm"
                      onClick={async () => {
                        const deleted = await deteleteSector(+data?.id);
                        if (deleted) {
                          const newList = category.filter(
                            (sector) => sector.id !== data.id
                          );
                          setCategory(newList);
                        }
                      }}
                    >
                      <Trash size={iconSize.iconSize} />
                    </button>
                  </footer>
                </figure>
              ))}
            </aside>
          ) : (
            <h1 className="text-gray-400 text-center">
              Sem categoria cadastradas
            </h1>
          )}
        </>
      )}
    </main>
  );
}
