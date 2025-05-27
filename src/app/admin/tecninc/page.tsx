"use client";
import IUser from "@/types/user";
import "./index.css";
import AOS from "aos";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { PlusCircle } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import CardTech from "@/components/CardTech";
export default function Tech() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loader, setLoader] = useState(true);
  const [add, setAdd] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: "Ana",
          lastname: "Ferreira",
          email: "ana.ferreira@example.com",
          telefone: "+244923001122",
          area: "RH",
          password: "anaPass123",
          total: 100,
          completed: 30,
          canceled: 30,
          peending: 20,
        },
        {
          id: 2,
          name: "Bruno",
          lastname: "Cunha",
          email: "bruno.cunha@example.com",
          telefone: "+244934112233",
          area: "TI",
          password: "bruno@dev",
          total: 1600,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 3,
          name: "Clara",
          lastname: "Dias",
          email: "clara.dias@example.com",
          password: "clar@2025",
          total: 1400,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 4,
          name: "David",
          lastname: "Mendes",
          email: "david.mendes@example.com",
          telefone: "+244923223344",
          area: "Design",
          password: "davidUX44",
          total: 1040,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 5,
          name: "Eva",
          lastname: "Martins",
          email: "eva.martins@example.com",
          password: "evamart!32",
          total: 800,
          completed: 540,
          canceled: 30,
          peending: 20,
        },
        {
          id: 6,
          name: "Fábio",
          lastname: "Rocha",
          email: "fabio.rocha@example.com",
          telefone: "+244921445566",
          area: "DevOps",
          password: "fabioDevops99",
          total: 100,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 7,
          name: "Gabriela",
          lastname: "Costa",
          email: "gabriela.costa@example.com",
          password: "gabi321",
          total: 100,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 8,
          name: "Henrique",
          lastname: "Alves",
          email: "henrique.alves@example.com",
          area: "Gestão",
          password: "henri@gestao",
          total: 100,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 9,
          name: "Isabel",
          lastname: "Barros",
          email: "isabel.barros@example.com",
          password: "isa!barros21",
          total: 100,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 10,
          name: "João",
          lastname: "Pinto",
          email: "joao.pinto@example.com",
          telefone: "+244933556677",
          area: "Infraestrutura",
          password: "joaoInfra77",
          total: 100,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 11,
          name: "Karen",
          lastname: "Moreira",
          email: "karen.moreira@example.com",
          password: "kmoreira2025",
          total: 100,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 12,
          name: "Lucas",
          lastname: "Teixeira",
          email: "lucas.teixeira@example.com",
          area: "Financeiro",
          password: "lucasfin",
          total: 100,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 13,
          name: "Márcia",
          lastname: "Lopes",
          email: "marcia.lopes@example.com",
          password: "marcia1234",
          total: 100,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 14,
          name: "Nuno",
          lastname: "Vieira",
          email: "nuno.vieira@example.com",
          password: "nvieira@2024",
          total: 100,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
        {
          id: 15,
          name: "Olívia",
          lastname: "Cruz",
          email: "olivia.cruz@example.com",
          telefone: "+244938112233",
          password: "cruz@olivia",
          total: 100,
          completed: 50,
          canceled: 30,
          peending: 20,
        },
      ]);
      setLoader(false);
    }, 4000);
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      offset: 200,
    });
  }, []);

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
            className="border p-3 rounded-sm border-orange-400 w-[90%] lg:w-[40%] flex flex-col gap-3"
          >
            <h1 className="text-[20px] font-bold">Criar Funcionário</h1>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="entre com o nome"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />
            <label htmlFor="lastname">Sobrenome</label>
            <input
              type="text"
              id="lastname"
              placeholder="entre com o sobrenome"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="exemplo@dominio.com"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />
            <label htmlFor="Telefone">Telefone</label>
            <input
              type="tel"
              id="Telefone"
              placeholder="xxx xxx xxx"
              className="border p-2 rounded-sm outline-0  border-orange-400"
            />
            <label htmlFor="area">Sector</label>
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
      <header className="w-full flex flex-col lg:flex-row center lg:items-center  justify-between gap-[10px] p-[10px] pt-[20px] lg:sticky top-0 bg-white z-10 mt-[45px] lg:mt-0">
        <div className="lg:w-[50%] w-full">
          <SearchBar placeholder="Buscar por funcionários" onClick={() => {}} />
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
      {loader ? (
        <section className="grid grid-cols-1 gap-[20px] pt-[10px] lg:grid-cols-3 md:grid-cols-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <figure key={index}>
              <Skeleton height={200} width="100%" />
              <Skeleton count={5} height={10} width="100%" />
            </figure>
          ))}
        </section>
      ) : (
        <>
          {Array.isArray(users) && users.length > 0 ? (
            <section className="grid grid-cols-1 gap-[20px] pt-[10px] lg:grid-cols-3 md:grid-cols-2 lg:mb-0 mb-4 overflow-hidden ">
              {users.map((data, index) => (
                <CardTech tech={data} key={index} />
              ))}
            </section>
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
