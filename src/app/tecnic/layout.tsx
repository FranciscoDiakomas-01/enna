import type { Metadata } from "next";
import "../globals.css";
import "./layout.css";
import ILink from "@/types/link";
import "aos/dist/aos.css";
import {
  FolderArchive,
  HomeIcon,
  WorkflowIcon,
  UserIcon,
  UserMinusIcon,
  Settings,
} from "lucide-react";
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
      to: "/tecnic",
    },
    {
      icon: <FolderArchive size={iconSize.iconSize} />,
      id: 2,
      text: "Tarefas",
      to: "/tecnic/task",
    },
    {
      icon: <Settings size={iconSize.iconSize} />,
      id: 6,
      text: "Perfil",
      to: "/tecnic/acount",
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
