"use client";
import "./globals.css";
import Logo from "@/components/Logo";
import Login from "@/services/login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader, SyncLoader } from "react-spinners";
export default function Home() {
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  useEffect(() => {}, [error, sucess]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");
    const userType = localStorage.getItem("usertype");
    if (token && userId && userType === "Admin") {
      router.push("/admin");
      return;
    } else if (token && userId && userType === "Tecnic") {
      router.push("/tecnic");
      return;
    } 
    const timer = setTimeout(() => {
      setLoader(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [router]);

  async function loginAction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (!email) {
      setSucess("");
      setError("Preencha a email");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else if (!password) {
      setSucess("");
      setError("Preencha a senha");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      setLoading(true);
      setError("");
      setSucess("");
      const data = await Login(email, password);
      if (data.message == "Logado com sucesso") {
        setTimeout(() => {
          setLoading(false);
          setSucess(data.message);
          setError("");
        }, 3000);
        setTimeout(() => {
          window.location.reload();
        }, 6000);
        return;
      } else {
        setTimeout(() => {
          setLoading(false);
          setSucess("");
          setError(data.message);
        }, 2000);
      }
    }
  }
  return (
    <>
      {loader ? (
        <main className="flex  h-[100dvh] justify-center items-center">
          <SyncLoader size={7} color="orange" />
        </main>
      ) : (
        <main className="flex  h-[100dvh] justify-center items-center">
          <form
            onSubmit={loginAction}
            className=" p-4 flex flex-col gap-4 place-self-center w-[80%] lg:w-[30%] md:w-[50%]"
          >
            <Logo />
            <label htmlFor="email">Email</label>
            <input
              required
              className="outline-0 h-[40px] border p-2 rounded-sm "
              type="email"
              id="email"
              name="email"
              placeholder="exemplo@gmail.com"
            />
            <label htmlFor="password">Senha</label>
            <input
              required
              className="outline-0 h-[40px] border p-2 rounded-sm "
              type="password"
              name="password"
              id="password"
              placeholder="Entre com sua senha"
            />
            <button
              className="bg-orange-400 text-white w-full h-[40px] rounded-full text-[13px] transition hover:bg-orange-500"
              type="submit"
            >
              Entrar
            </button>
            {error && (
              <p id="error" className="text-red-400 text-center">
                {error}
              </p>
            )}
            {sucess && (
              <p id="error" className="text-green-400 text-center">
                {sucess}
              </p>
            )}
            {loading && (
              <ClipLoader className="flex place-self-center" color="orange" />
            )}
          </form>
        </main>
      )}
    </>
  );
}
