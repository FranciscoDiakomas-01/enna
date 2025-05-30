"use client";

import SearchBar, { SelectchBar } from "@/components/SearchBar";
import iconSize from "@/constants/iconSize";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import TaskCard from "@/components/Task";
import { ArrowLeft, ArrowRight, PlusCircle } from "lucide-react";
import RedirectToLogin from "@/services/redirect";
export default function Tasks() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTasks([]);
    setTimeout(() => {
      setLoading(false);
      setTasks([
        {
          id: 1,
          ticket_id: 1,
          tech_id: 101,
          description: "Analisar erro de login no painel",
          date_start: "jan 10 2015",
          date_end: "jan 10 2015",
          time_spent: 150,
          status: "Concluída",
          notes: "Erro causado por variável de ambiente não definida.",
          attachments: ["log1.txt"],
          created_at: "dez 10 2014",
          updated_at: "jan 10 2015",
        },
        {
          id: 2,
          ticket_id: 2,
          tech_id: 102,
          description: "Atualizar dados do cliente no banco",
          date_start: "dez 10 2014",
          date_end: "dez 10 2014",
          time_spent: 120,
          status: "Concluída",
          notes: "Cliente alterou endereço e telefone.",
          attachments: [],
          created_at: "dez 10 2014",
          updated_at: "dez 10 2014",
        },
        {
          id: 3,
          ticket_id: 3,
          tech_id: 103,
          description: "Documentar nova funcionalidade solicitada",
          date_start: "dez 10 2014",
          date_end: "mai 03 2025",
          time_spent: 150,
          status: "Em andamento",
          notes: "Documentação sendo revisada pela equipe.",
          attachments: ["specs.docx"],
          created_at: "dez 10 2014",
          updated_at: "mai 03 2025",
        },
        {
          id: 4,
          ticket_id: 4,
          tech_id: 104,
          description: "Corrigir erro de carregamento de imagens",
          date_start: "mai 04 2025",
          date_end: "mai 04 2025",
          time_spent: 45,
          status: "Concluída",
          notes: "Problema no caminho da imagem corrigido.",
          attachments: ["screenshot.png"],
          created_at: "mai 04 2025",
          updated_at: "mai 04 2025",
        },
        {
          id: 5,
          ticket_id: 5,
          tech_id: 105,
          description: "Implementar log de atividade no sistema",
          date_start: "mai 05 2025",
          date_end: "mai 05 2025",
          time_spent: 180,
          status: "Concluída",
          notes: "Logs armazenados no banco e exibidos no painel.",
          attachments: [],
          created_at: "mai 05 2025",
          updated_at: "mai 05 2025",
        },
        {
          id: 6,
          ticket_id: 6,
          tech_id: 101,
          description: "Criar testes unitários para módulo de pagamento",
          date_start: "mai 06 2025",
          date_end: "mai 06 2025",
          time_spent: 210,
          status: "Em andamento",
          notes: "Testes em 60% de cobertura.",
          attachments: [],
          created_at: "mai 06 2025",
          updated_at: "mai 06 2025",
        },
        {
          id: 7,
          ticket_id: 7,
          tech_id: 102,
          description: "Remover usuários inativos do sistema",
          date_start: "mai 07 2025",
          date_end: "mai 07 2025",
          time_spent: 75,
          status: "Concluída",
          notes: "Backup dos dados realizado.",
          attachments: ["backup.sql"],
          created_at: "mai 07 2025",
          updated_at: "mai 07 2025",
        },
        {
          id: 8,
          ticket_id: 8,
          tech_id: 103,
          description: "Integrar API externa de clima",
          date_start: "mai 08 2025",
          date_end: "mai 08 2025",
          time_spent: 150,
          status: "Concluída",
          notes: "API da OpenWeather configurada com chave segura.",
          attachments: ["api_doc.pdf"],
          created_at: "mai 08 2025",
          updated_at: "mai 08 2025",
        },
        {
          id: 9,
          ticket_id: 9,
          tech_id: 104,
          description: "Auditoria de permissões de acesso",
          date_start: "mai 09 2025",
          date_end: "mai 09 2025",
          time_spent: 120,
          status: "Pendente",
          notes: "",
          attachments: [],
          created_at: "mai 09 2025",
          updated_at: "mai 09 2025",
        },
        {
          id: 10,
          ticket_id: 10,
          tech_id: 105,
          description: "Atualizar pacotes npm do projeto",
          date_start: "mai 10 2025",
          date_end: "mai 10 2025",
          time_spent: 90,
          status: "Concluída",
          notes: "Atualizado React, Express e Prisma.",
          attachments: [],
          created_at: "mai 10 2025",
          updated_at: "mai 10 2025",
        },
        {
          id: 11,
          ticket_id: 11,
          tech_id: 101,
          description: "Configurar HTTPS no servidor",
          date_start: "mai 11 2025",
          date_end: "mai 11 2025",
          time_spent: 105,
          status: "Concluída",
          notes: "Certificado SSL gratuito configurado com sucesso.",
          attachments: [],
          created_at: "mai 11 2025",
          updated_at: "mai 11 2025",
        },
        {
          id: 12,
          ticket_id: 12,
          tech_id: 102,
          description: "Analisar falhas na autenticação OAuth",
          date_start: "mai 12 2025",
          date_end: "mai 12 2025",
          time_spent: 150,
          status: "Em andamento",
          notes: "Problema na expiração do token JWT.",
          attachments: [],
          created_at: "mai 12 2025",
          updated_at: "mai 12 2025",
        },
      ]);
    }, 2000);
  }, []);
  return (
    <main>
      <header className="w-full flex flex-col center items-center  justify-between gap-[5px] p-[10px] pt-[20px] x top-15 mt-25 lg:mt-0  bg-white z-10 lg:top-0 lg:flex-row lg:sticky">
        <SearchBar placeholder="Busque tarefa" onClick={() => {}} />
        <SelectchBar
          onClick={() => {}}
          placeholder="Filtrar por estado"
          values={[
            {
              id: 1,
              text: "Pendente",
            },
            {
              id: 2,
              text: "Em andamento",
            },
            {
              id: 3,
              text: "Concluída",
            },
            {
              id: 4,
              text: "Cancelada",
            },
          ]}
        />
      </header>

      <button className=" fixed flex gap-[5px] items-center justify-center text-white bg-orange-400  text-[13px]  rounded-full w-[40px] h-[40px] bottom-10 right-5 z-3">
        <span>
          <PlusCircle size={iconSize.iconSize} />
        </span>
      </button>

      {loading ? (
        <div className="flex center items-center justify-center h-[calc(100vh-60px)]">
          <SyncLoader size={7} color="orange" />
        </div>
      ) : (
        <>
          {tasks.length > 0 ? (
            <>
              <aside className="grid grid-cols-1 gap-5 p-[10px] lg:grid-cols-3">
                {tasks.map((task, index) => (
                  <TaskCard key={index} task={task} admin={false} />
                ))}
              </aside>
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
