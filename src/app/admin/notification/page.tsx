"use client";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Notification() {
  const [noti, setNoti] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setNoti([
        {
          id: 1,
          read: false,
          text: "Tarefa pendente atribuída a você",
          message: "Você tem uma nova tarefa para revisar",
          type: "Task",
          deeplink: "/tasks/1",
        },
        {
          id: 2,
          read: true,
          text: "Novo ticket recebido",
          message: "Um cliente enviou um novo ticket de suporte",
          type: "Ticket",
          deeplink: "/tickets/98",
        },
        {
          id: 3,
          read: false,
          text: "Usuário atualizado",
          message: "Informações do usuário João foram atualizadas",
          type: "User",
          deeplink: "/users/joao",
        },
        {
          id: 4,
          read: false,
          text: "Backup concluído",
          message: "O backup do sistema foi finalizado com sucesso",
          type: "Other",
        },
        {
          id: 5,
          read: true,
          text: "Nova tarefa atribuída",
          message: "Nova tarefa: revisar documentação",
          type: "Task",
          deeplink: "/tasks/45",
        },
        {
          id: 6,
          read: false,
          text: "Falha de login",
          message: "Tentativa de login suspeita detectada",
          type: "Other",
        },
        {
          id: 7,
          read: false,
          text: "Novo ticket aberto",
          message: "Cliente abriu ticket sobre erro no pagamento",
          type: "Ticket",
          deeplink: "/tickets/124",
        },
        {
          id: 8,
          read: true,
          text: "Perfil atualizado",
          message: "Você atualizou suas informações de perfil",
          type: "User",
        },
        {
          id: 9,
          read: false,
          text: "Tarefa concluída",
          message: "Parabéns! Você concluiu a tarefa 'Atualizar FAQ'",
          type: "Task",
        },
        {
          id: 10,
          read: false,
          text: "Atualização do sistema",
          message: "A versão 2.1.0 foi instalada com sucesso",
          type: "Other",
        },
        {
          id: 11,
          read: false,
          text: "Comentário em ticket",
          message: "Novo comentário no ticket #345",
          type: "Ticket",
        },
        {
          id: 12,
          read: true,
          text: "Novo colaborador adicionado",
          message: "Carlos foi adicionado ao projeto",
          type: "User",
        },
        {
          id: 13,
          read: false,
          text: "Erro de sincronização",
          message: "Falha ao sincronizar com o servidor",
          type: "Other",
        },
        {
          id: 14,
          read: true,
          text: "Tarefa agendada",
          message: "Nova tarefa programada para sexta-feira",
          type: "Task",
        },
        {
          id: 15,
          read: false,
          text: "Novo ticket: URGENTE",
          message: "Prioridade alta: erro no painel do cliente",
          type: "Ticket",
        },
        {
          id: 16,
          read: true,
          text: "Senha alterada com sucesso",
          message: "Sua senha foi atualizada",
          type: "User",
        },
        {
          id: 17,
          read: false,
          text: "Sistema reiniciado",
          message: "O sistema foi reiniciado às 03:00",
          type: "Other",
        },
        {
          id: 18,
          read: false,
          text: "Nova tarefa: enviar relatório",
          message: "Lembrete: envie o relatório mensal até sexta",
          type: "Task",
        },
        {
          id: 19,
          read: true,
          text: "Novo ticket fechado",
          message: "O ticket #290 foi encerrado",
          type: "Ticket",
        },
        {
          id: 20,
          read: false,
          text: "Atualização de perfil",
          message: "Altere sua foto de perfil para maior segurança",
          type: "User",
        },
      ]);
      setLoading(false);
    }, 3000);
    AOS.init({
      once: true,
      offset: 70,
      duration: 1000,
    });
  }, []);
  return (
    <main className="flex flex-col gap-5 justify-center items-center">
      {loading ? (
        <div className="flex center items-center justify-center h-[calc(100vh-60px)]">
          <SyncLoader size={7} color="orange" />
        </div>
      ) : (
        <>
          <h1 className="text-xl text-center">Notificações</h1>
          {Array.isArray(noti) && noti.length > 0 ? (
            <aside className="grid grid-cols-1 lg:grid-cols-2 gap-5  w-full">
              {noti.map((data, index) => (
                <figure
                  key={index}
                  className="border flex flex-col gap-2 rounded-sm p-2"
                  data-aos="fade-left"
                >
                  <Bell />
                  <small className="h-4 p-2 flex justify-center items-center bg-orange-400 w-[50px] text-white rounded-full">
                    {data.type}
                  </small>
                  <h1 className="text-[15px] font-semibold">{data.text}</h1>
                  <p>{data.message}</p>
                  {data.deeplink && (
                    <Link
                      href={data.deeplink}
                      className="h-[25px] bg-orange-400 w-[70px] flex justify-center items-center rounded-full text-white"
                    >
                      ver
                    </Link>
                  )}
                </figure>
              ))}
            </aside>
          ) : (
            <h1 className="text-gray-500 text-center">Sem notficações</h1>
          )}
        </>
      )}
    </main>
  );
}
