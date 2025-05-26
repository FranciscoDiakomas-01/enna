"use client";

import ClientCard from "@/components/Client";
import SearchBar from "@/components/SearchBar";
import IClient from "@/types/client";
import { Box, PlusCircle, Rocket, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

export default function Client() {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<IClient[]>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setClients([
        {
          id: "1",
          name: "Lucas",
          lastname: "Silva",
          email: "lucas.silva@email.com",
          phone: "+55 11 91234-5678",
          gender: "M",
          createdAt: "2024-10-01T10:00:00Z",
          updatedAt: "2025-05-20T14:32:00Z",
          works: 5,
        },
        {
          id: "2",
          name: "Ana",
          lastname: "Pereira",

          email: "ana.pereira@email.com",
          phone: "+55 21 99876-5432",
          gender: "F",
          createdAt: "2023-07-12T08:20:00Z",
          updatedAt: "2025-04-15T11:00:00Z",
          works: 8,
        },
        {
          id: "3",
          name: "João",
          lastname: "Costa",

          email: "joao.costa@email.pt",
          phone: "+351 912345678",
          gender: "M",
          createdAt: "2022-11-05T14:00:00Z",
          updatedAt: "2025-05-10T09:10:00Z",
          works: 3,
        },
        {
          id: "4",
          name: "Beatriz",
          lastname: "Almeida",

          email: "bea.almeida@email.pt",
          phone: "+351 934567891",
          gender: "F",
          createdAt: "2024-03-22T16:00:00Z",
          updatedAt: "2025-01-12T17:00:00Z",
          works: 2,
        },
        {
          id: "5",
          name: "Alex",
          lastname: "Taylor",
          email: "alex.taylor@email.com",
          phone: "+1 212-555-1234",
          gender: "P",
          createdAt: "2023-09-10T13:45:00Z",
          updatedAt: "2025-05-05T10:10:00Z",
          works: 7,
        },
        {
          id: "6",
          name: "Carlos",
          lastname: "Fernandes",
          email: "carlos.fernandes@email.mz",
          phone: "+258 84 123 4567",
          gender: "M",
          createdAt: "2023-06-18T10:00:00Z",
          updatedAt: "2025-03-22T08:00:00Z",
          works: 4,
        },
        {
          id: "7",
          name: "Mariana",
          lastname: "Lopes",
          email: "mariana.lopes@email.ao",
          phone: "+244 923 456 789",
          gender: "F",
          createdAt: "2024-01-30T09:30:00Z",
          updatedAt: "2025-04-25T10:20:00Z",
          works: 6,
        },
        {
          id: "8",
          name: "Taylor",
          lastname: "Morgan",
          email: "taylor.morgan@email.com",
          phone: "+1 310-123-4567",
          gender: "P",
          createdAt: "2022-12-01T11:00:00Z",
          updatedAt: "2025-02-18T12:15:00Z",
          works: 9,
        },
        {
          id: "9",
          name: "Roberto",
          lastname: "Dias",
          email: "roberto.dias@email.com",
          phone: "+55 61 99999-8888",
          gender: "M",
          createdAt: "2023-08-15T08:00:00Z",
          updatedAt: "2025-03-30T14:45:00Z",
          works: 1,
        },
        {
          id: "10",
          name: "Luísa",
          lastname: "Martins",
          email: "luisa.martins@email.pt",
          phone: "+351 987654321",
          gender: "F",
          createdAt: "2023-05-10T17:00:00Z",
          updatedAt: "2025-05-01T10:00:00Z",
          works: 5,
        },
        {
          id: "11",
          name: "Chris",
          lastname: "Lee",
          email: "chris.lee@email.com",
          phone: "+1 773-555-6789",
          gender: "P",
          createdAt: "2023-02-02T10:00:00Z",
          updatedAt: "2025-04-10T14:00:00Z",
          works: 3,
        },
        {
          id: "12",
          name: "Felipe",
          lastname: "Nunes",
          email: "felipe.nunes@email.com",
          phone: "+55 81 98877-6655",
          gender: "M",
          createdAt: "2023-09-01T09:00:00Z",
          updatedAt: "2025-01-05T13:30:00Z",
          works: 2,
        },
        {
          id: "13",
          name: "Daniela",
          lastname: "Souza",
          email: "daniela.souza@email.com",
          phone: "+55 41 98765-4321",
          gender: "F",
          createdAt: "2022-11-15T12:00:00Z",
          updatedAt: "2025-05-15T09:45:00Z",
          works: 7,
        },
        {
          id: "14",
          name: "Sam",
          lastname: "Rivera",
          email: "sam.rivera@email.com",
          phone: "+1 305-999-1234",
          gender: "P",
          createdAt: "2024-05-01T11:00:00Z",
          updatedAt: "2025-05-22T08:20:00Z",
          works: 10,
        },
        {
          id: "15",
          name: "Joana",
          lastname: "Meireles",
          email: "joana.meireles@email.pt",
          phone: "+351 911234567",
          gender: "F",
          createdAt: "2024-02-25T15:00:00Z",
          updatedAt: "2025-04-10T16:30:00Z",
          works: 6,
        },
      ]);
    }, 2000);
  }, []);
  return (
    <main>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <SyncLoader size={7} color="orange" />
        </div>
      ) : (
        <>
          <aside className="grid grid-cols-1 mt-25 gap-4 lg:grid-cols-3 lg:mt-0">
            <div className="border border-purple-400 rounded-lg p-4 h-[100px] border-dashed flex justify-between items-center gap-4">
              <div className="flex items-center gap-2 flex-col">
                <span className="flex items-center h-[45px] w-[45px] rounded-full bg-orange-400 text-white justify-center">
                  <Rocket size={17} />
                </span>
                <p>Masculinos</p>
              </div>
              <span>
                <h1 className="text-3xl ">10</h1>
              </span>
            </div>
            <div className="border border-purple-400 rounded-lg p-4 h-[100px] border-dashed flex justify-between items-center gap-4">
              <div className="flex items-center gap-2 flex-col">
                <span className="flex items-center h-[45px] w-[45px] rounded-full bg-orange-400 text-white justify-center">
                  <Box size={17} />
                </span>
                <p>Femeninos</p>
              </div>
              <span>
                <h1 className="text-3xl">10</h1>
              </span>
            </div>
            <div className="border border-purple-400 rounded-lg p-4  h-[100px] border-dashed  flex justify-between items-center gap-4">
              <div className="flex items-center gap-2 flex-col">
                <span className="flex items-center h-[45px] w-[45px] rounded-full bg-orange-400 text-white justify-center">
                  <User2 />
                </span>
                <p>Personalizado</p>
              </div>
              <span>
                <h1 className="text-3xl">10</h1>
              </span>
            </div>
          </aside>
          <header className="w-full flex center lg:items-center  justify-between gap-[10px] p-[10px] pt-[20px] sticky top-0 bg-white z-10 flex-col lg:flex-row">
            <SearchBar placeholder="Buscar por clientes" onClick={() => {}} />
            <button className="flex gap-[5px] items-center justify-center p-[7px] text-white bg-orange-400 rounded-[5px] text-[13px]">
              <PlusCircle size={14} />
              Adicionar
            </button>
          </header>

          {Array.isArray(clients) && clients.length > 0 ? (
            <aside className="grid grid-cols-1 gap-4 mt-[20px] lg:grid-cols-4 md:grid-cols-2 pb-2 overflow-hidden">
              {clients.map((client, key) => (
                <ClientCard client={client} key={key} />
              ))}
            </aside>
          ) : (
            <div className="flex items-center justify-center w-full h-[300px]">
              <h1 className="text-gray-400 text-[20px]">
                Nenhum cliente encontrado
              </h1>
            </div>
          )}
        </>
      )}
    </main>
  );
}
