import type { Metadata } from "next";
import "../globals.css";
import './layout.css'
import ILink from "@/types/link";
import "aos/dist/aos.css";
import { FolderArchive, HomeIcon , WorkflowIcon , UserIcon , Settings, Box, Users } from "lucide-react";
import SideBar from "@/components/SideBar";
import iconSize from "@/constants/iconSize";

export const metadata: Metadata = {
  title: "Enna",
  description: "Sistema de gestão de tarefas",
};

export default function AdminLeyout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links: ILink[] = [
    {
      icon: <HomeIcon size={iconSize.iconSize} />,
      id: 1,
      text: "Painel",
      to: "/admin",
    },
    {
      icon: <FolderArchive size={iconSize.iconSize} />,
      id: 2,
      text: "Solicitaçoes",
      to: "/admin/ticket",
    },
    {
      icon: <WorkflowIcon size={iconSize.iconSize} />,
      id: 3,
      text: "Tarefas",
      to: "/admin/task",
    },
    {
      icon: <UserIcon size={iconSize.iconSize} />,
      id: 4,
      text: "Clientes",
      to: "/admin/clients",
    },
    {
      icon: <Users size={iconSize.iconSize} />,
      id: 5,
      text: "Funcionários",
      to: "/admin/tecninc",
    },
    {
      icon: <Box size={iconSize.iconSize} />,
      id: 53,
      text: "Categorias",
      to: "/admin/category",
    },
    {
      icon: <Settings size={iconSize.iconSize} />,
      id: 6,
      text: "Perfil",
      to: "/admin/acount",
    },
  ];
  return (
    <main id="admin">
      <section>
        <SideBar links={links} />
        {children}
      </section>
    </main>
  );
}
