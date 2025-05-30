"use client";
import { ArrowLeft, ArrowRight, Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import AOS from "aos";
import "aos/dist/aos.css";
import getAllMyNotifications from "@/services/notfications";
import iconSize from "@/constants/iconSize";
export default function Notification() {
  const [noti, setNoti] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastpage, setLastPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    async function get() {
      const data = await getAllMyNotifications(String(page));
      setTimeout(() => {
        setNoti(data?.data);
        setLoading(false);
        setLastPage(data?.lastPage);
      }, 3000);
    }
    get();
    AOS.init({
      once: true,
      offset: 70,
      duration: 1000,
    });
  }, [page]);
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
            <>
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
                    <p>{new Date(data.created).toLocaleDateString("pt")}</p>
                  </figure>
                ))}
              </aside>{" "}
              <footer className="flex w-full justify-between items-center border-t pt-2">
                <p>
                  {page} de {lastpage}
                </p>
                <span className="flex justify-between items-center gap-1">
                  <button
                    onClick={() => {
                      if (page > 1) setPage(page - 1);
                    }}
                    disabled={page === 1}
                    className={`flex gap-[5px] items-center justify-center p-[7px] text-white rounded-[5px] text-[13px] w-[30px] ${
                      page === 1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-400"
                    }`}
                  >
                    <ArrowLeft size={iconSize.iconSize} />
                  </button>

                  <button
                    onClick={() => {
                      if (page < lastpage) setPage(page + 1);
                    }}
                    disabled={page === lastpage}
                    className={`flex gap-[5px] items-center justify-center p-[7px] text-white rounded-[5px] text-[13px] w-[30px] ${
                      page === lastpage
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-400"
                    }`}
                  >
                    <ArrowRight size={iconSize.iconSize} />
                  </button>
                </span>
              </footer>
            </>
          ) : (
            <h1 className="text-gray-500 text-center">Sem notficações</h1>
          )}
        </>
      )}
    </main>
  );
}
