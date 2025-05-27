"use client";
import "./index.css";
import ILink from "@/types/link";
import Logo from "../Logo";
import Link from "next/link";
import { LucideLogOut, Menu } from "lucide-react";
import iconSize from "@/constants/iconSize";
import { useEffect, useState } from "react";
import image from "../../assets/logo.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Notification from "../NotificationBanner/notification";
export default function SideBar({ links }: { links: ILink[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [notificationRouter, setNotificationRouter] = useState(
    "/admin/notification"
  );
  
  useEffect(() => {
    const location = window.location.href
    if (location.includes("/tecnic")) {
      setNotificationRouter("/tecnic/notification");
    } 
  },[])

  useEffect(() => {
    const menuBuguer = document.getElementById("menuBuguer");
    if (!open) {
      if (menuBuguer) {
        menuBuguer.classList.remove("open");
      }
    } else {
      if (menuBuguer) {
        menuBuguer.classList.add("open");
      }
    }
  }, [open]);
  return (
    <>
      {" "}
      <nav
        id="sidebar"
        className="fixed  h-full w-[15%] bg-white z-20 top-0 left-0 border-r-[1px] justify-between gap-5 p-5 border-collapse border-dashed items-center flex-col hidden lg:block"
      >
        <div className="flex gap-[40px] flex-col w-[100%] p-1.5">
          <Logo />
          <ul className="flex gap-[20px] flex-col">
            {links.map((data, index) => (
              <Link
                onClick={() => {
                  const noti = document.getElementById("noti");
                  if (noti) {
                    noti.classList.remove("active");
                  }
                  setActive(index);
                }}
                href={data.to}
                key={data.id}
                className="flex items-center w-full text-orange-700 gap-[10px] p-[12px]  rounded-sm transition-all transform-fill duration-200"
                style={{
                  color: active == index ? "#fff" : "",
                  backgroundColor: active == index ? "orange" : "",
                }}
              >
                {data.icon}
                <p>{data.text}</p>
              </Link>
            ))}
            <Notification
              to={notificationRouter}
              click={() => {
                const noti = document.getElementById("noti");
                if (noti) {
                  setActive(444);
                  noti.classList.add("active");
                }
              }}
            />
          </ul>
        </div>

        <button
          className="flex border text-orange-600 center items-center gap-2 p-2.5  w-[100%] justify-center cursor-pointer transition rounded-sm hover:text-orange-950"
          onClick={() => {
            router.push("/");
          }}
        >
          <LucideLogOut size={iconSize.iconSize} />
          Sair
        </button>
      </nav>
      <nav
        className="flex fixed top-0 lef-0 w-full  justify-between items-center z-50 bg-white p-2 pl-5 pr-5
      text-orange-700  lg:hidden"
      >
        <div className="cursor-pointer">
          <Image
            src={image}
            alt="Logo"
            className="h-[30px] w-[45px] object-contain"
          />
        </div>
        <Menu
          style={{
            transform: !open ? "rotate(0deg)" : "rotate(90deg)",
          }}
          className="cursor-pointer transition"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        />
      </nav>
      <div
        id="menuBuguer"
        className="fixed bottom-0 right-0 bg-white z-[12] w-full h-full flex flex-col items-center   pt-[100px] lg:hidden"
        onClick={() => {
          setTimeout(() => {
            setOpen(false);
          }, 1000);
        }}
      >
        <ul className="flex gap-[20px] flex-col w-[200px]">
          {links.map((data, index) => (
            <Link
              onClick={() => {
                setActive(index);
              }}
              href={data.to}
              key={data.id}
              className="flex items-center w-full text-orange-900 gap-[10px] p-[12px]  rounded-sm transition-all transform-fill duration-200"
              style={{
                color: active == index ? "#fff" : "",
                backgroundColor: active == index ? "orange" : "",
              }}
            >
              {data.icon}
              <p>{data.text}</p>
            </Link>
          ))}
          <Notification
            to={notificationRouter}
            click={() => {
              const noti = document.getElementById("noti");
              if (noti) {
                setActive(444);
                noti.classList.add("active");
              }
            }}
          />
          <button
            className="flex border text-orange-600 center items-center gap-2 p-2.5  w-full justify-center cursor-pointer transition rounded-sm hover:text-orange-950"
            onClick={() => {
              router.push("/");
            }}
          >
            <LucideLogOut size={iconSize.iconSize} />
            Sair
          </button>
        </ul>
      </div>
    </>
  );
}
