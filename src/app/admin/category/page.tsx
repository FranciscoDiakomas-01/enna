"use client";
import SearchBar from "@/components/SearchBar";
import "./index.css";
import AOS from "aos";

import "aos/dist/aos.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Edit, PlusCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import iconSize from "@/constants/iconSize";
export default function Category() {
  const [load, setLoad] = useState(true);
  const [category, setCategory] = useState<Icategory[]>([]);
  useEffect(() => {
    setLoad(true);
    setCategory([
      {
        id: 1,
        text: "Suporte Técnico",
        descripton: "Atendimento a problemas com hardware, software ou rede.",
      },
      {
        id: 2,
        text: "Reset de Senha",
        descripton: "Solicitação para redefinir senhas de acesso ao sistema.",
      },
      {
        id: 3,
        text: "Instalação de Software",
        descripton: "Instalação ou atualização de softwares autorizados.",
      },
      {
        id: 4,
        text: "Configuração de E-mail",
        descripton: "Ajuda na configuração de contas de e-mail corporativo.",
      },
      {
        id: 5,
        text: "Problemas de Rede",
        descripton: "Reportar falhas de conexão à internet ou rede interna.",
      },
      {
        id: 6,
        text: "Suporte a Impressoras",
        descripton: "Resolução de problemas com impressoras locais ou de rede.",
      },
      {
        id: 7,
        text: "Acesso a Sistemas",
        descripton:
          "Solicitação de liberação ou ajuste de permissões em sistemas.",
      },
      {
        id: 8,
        text: "Manutenção Preventiva",
        descripton:
          "Execução de rotinas de verificação e manutenção em equipamentos.",
      },
      {
        id: 9,
        text: "Backup e Recuperação",
        descripton:
          "Solicitações relacionadas a backup de dados e recuperação de arquivos.",
      },
      {
        id: 10,
        text: "Solicitação de Equipamentos",
        descripton:
          "Pedido de novos equipamentos ou substituição de defeituosos.",
      },
    ]);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
    AOS.init({
      once: true,
      offset: 70,
      duration: 1000,
    });
  }, []);
  return (
    <main className="flex flex-col gap-7">
      <header className="flex flex-col md:flex-row lg:flex-row justify-between items-center md:items-start lg:items-start gap-3 pt-[70px] lg:pt-0">
        <div className="w-[100%] md:w-[70%] lg:w-[45%]">
          <SearchBar onClick={() => {}} placeholder="Busque por categoria" />
        </div>
        <button className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px] w-full md:w-[100px lg:w-[100px]">
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
                  className="border p-3 flex flex-col gap-3 rounded-sm"
                >
                  <h1>{data.text}</h1>
                  <p>{data.descripton}</p>
                  <footer className="flex items-center gap-3">
                    <button className="bg-orange-400 text-white w-[40px] p-2 rounded-sm">
                      <Edit size={iconSize.iconSize} />
                    </button>
                    <button className="bg-red-500 text-white w-[40px] p-2 rounded-sm">
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
