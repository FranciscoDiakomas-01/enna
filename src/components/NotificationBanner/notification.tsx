"use client";
import iconSize from "@/constants/iconSize";
import { Bell } from "lucide-react";
import Link from "next/link";
import './index.css'
import { useEffect, useState } from "react";
import { countNotification } from "@/services/notfications";

export default function Notification({ to , click }: { to: string  , click () : void}) {
  const [noti, setNoti] = useState(0);
  useEffect(() => {
    const getNotification = async () => {
      const newnotification = await countNotification();
      setNoti(newnotification);
    };
    const interval = setInterval(() => {
      getNotification()
    },1000)
    getNotification();

    return () => clearInterval(interval);
  }, []);
  return (
    <Link
      onClick={() => {
        click()
      }}
      id="noti"
      href={to}
      key={to}
      className="flex items-center w-full text-orange-700 gap-[10px] p-[12px]  rounded-sm transition-all transform-fill duration-200"
    >
      <Bell size={iconSize.iconSize} />
      <p>Notficações</p>
      <sup>{noti != 0 && noti}</sup>
    </Link>
  );
}
