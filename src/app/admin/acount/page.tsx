"use client";

import "aos/dist/aos.css";
import AOS from "aos";
import "./index.css";
import IUser from "@/types/user";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
export default function Account() {
  const [active, setActive] = useState("Meus Dados");
  const [user, setUser] = useState<IUser>({
    id: 1,
    name: "Lucas",
    lastname: "Silva",
    email: "lucas.silva@example.com",
    telefone: "+55 11 91234-5678",
    area: "Suporte Técnico",
    password: "123456",
    created_at: "jan 20, 2025",
    updated_at: "may 20, 2025",
    completed: 150,
    peending: 5,
    canceled: 3,
    total: 158,
  });
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 70,
      duration: 800,
    });
  }, []);
  return (
    <main className="flex justify-center items-center lg:gap-4 flex-col lg:flex-row">
      <article
        className="p-5 w-[100%] lg:min-h-[400px] flex flex-col gap-4 rounded-sm lg:w-[30%] mt-[45px] lg:mt-0"
        data-aos="zoom-in "
      >
        <h1 className="text-2xl font-bold text-center">Conta</h1>
        <p className="text-center">Gerencie suas informações de conta aqui.</p>

        <button
          className="w-[50%] flex place-self-center justify-center items-center border border-orange-500 rounded-sm h-[30px] transition"
          onClick={() => {
            setActive("Meus Dados");
          }}
          id={active == "Meus Dados" ? "active" : ""}
        >
          Meus Dados
        </button>
        <button
          className="w-[50%] flex place-self-center justify-center items-center border border-orange-500 rounded-sm h-[30px] transition"
          id={active == "Credenciais" ? "active" : ""}
          onClick={() => {
            setActive("Credenciais");
          }}
        >
          Credenciais
        </button>
      </article>
      <aside className="border rounded-sm border-dashed p-5 w-[90%] lg:w-[50%] min-h-[400px] flex flex-col gap-3 items-center">
        {active == "Meus Dados" && (
          <div
            className="flex flex-col gap-1 w-full items-center"
            data-aos="zoom-in"
          >
            <h1 className="text-2xl font-bold text-center">Dados pessoas</h1>
            <form
              action=""
              className="flex flex-col gap-3 lg:mb-0 mb-[30px] w-[90%] lg:w-[60%]"
            >
              <label htmlFor="name">Nome</label>
              <input
                className="border h-[35px] p-2 rounded-sm"
                type="text"
                id="name"
                placeholder="seu nome"
                value={user.name}
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, name: e.target.value }));
                }}
              />{" "}
              <label htmlFor="lastname">Sobrenome</label>
              <input
                id="lastname"
                className="border h-[35px] p-2 rounded-sm"
                type="text"
                placeholder="seu sobrenome"
                value={user.lastname}
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, lastname: e.target.value }));
                }}
              />{" "}
              <label htmlFor="tel">Telefone</label>
              <input
                type="tel"
                id="tel"
                className="border h-[35px] p-2 rounded-sm"
                placeholder="+244 xxx xxx xxx"
                value={user.telefone}
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, telefone: e.target.value }));
                }}
              />{" "}
              <label htmlFor="desc">Descrição</label>
              <input
                type="text"
                className="border h-[35px] p-2 rounded-sm"
                id="desc"
                placeholder="simples descrição"
                value={user.area}
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, area: e.target.value }));
                }}
              />
              <button className="bg-orange-400 text-white h-[30px] rounded-full">
                Salvar <Save size={12} />{" "}
              </button>
            </form>
          </div>
        )}

        {active == "Credenciais" && (
          <div
            className="flex flex-col gap-1 w-full items-center"
            data-aos="zoom-in"
          >
            <h1 className="text-2xl font-bold text-center">Credencias</h1>
            <form
              action=""
              className="flex flex-col gap-3 lg:mb-0 mb-[30px] w-[90%] lg:w-[60%]"
            >
              <label htmlFor="name">Novo email</label>
              <input
                className="border h-[35px] p-2 rounded-sm"
                type="email"
                id="name"
                placeholder="exemplo@novais"
              />{" "}
              <label htmlFor="lastname">Nova senha</label>
              <input
                id="lastname"
                className="border h-[35px] p-2 rounded-sm"
                type="password"
                placeholder="sua nova senha"
              />{" "}
              <label htmlFor="tel">Email</label>
              <input
                type="tel"
                id="tel"
                className="border h-[35px] p-2 rounded-sm"
                placeholder="exemplo@novais"
              />{" "}
              <label htmlFor="desc">Senha</label>
              <input
                id="lastname"
                className="border h-[35px] p-2 rounded-sm"
                type="password"
                placeholder="sua senha"
              />
              <button className="bg-orange-400  text-white h-[30px] rounded-full">
                Salvar <Save size={12} />{" "}
              </button>
            </form>
          </div>
        )}
      </aside>
    </main>
  );
}
