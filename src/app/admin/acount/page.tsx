"use client";
import "aos/dist/aos.css";
import AOS from "aos";
import "./index.css";
import { useEffect, useState } from "react";
import {
  getMyData,
  updateMProfile,
  updateMyCredentials,
} from "@/services/users";
import { ClipLoader } from "react-spinners";
import { Save } from "lucide-react";
import RedirectToLogin from "@/services/redirect";
export default function Account() {
  const [active, setActive] = useState("Meus Dados");
  const [addError, setAdErro] = useState("");
  const [addSucess, setAddSUcess] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [credentials, setCredetials] = useState({
    currentPassowrd: "",
    currentTelefone: "",
    currentEmail: "",
    oldEmail: "",
    oldTelefone: "",
    oldPassword: "",
    id: 0,
  });
  useEffect(() => {}, [credentials]);
  const [user, setUser] = useState({
    id: 1,
    email: "true",
    name: "true",
    lastname: "true",
    bio: "true",
    created: "true",
    type: "true",
    tel: "true",
    updated: "true",
  });
  useEffect(() => {
    async function get() {
      const data = await getMyData();
      setUser(data);
    }
    get();
    AOS.init({
      once: true,
      offset: 70,
      duration: 800,
    });
  }, []);
  async function editData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user.name || !user.lastname || !user) {
      setAdErro("Preenche os campos obrigatórios");
      setTimeout(() => setAdErro(""), 3000);
      return;
    }
    setAddLoading(true);
    setAdErro("");
    const updated = await updateMProfile({
      bio: user.bio,
      id: user.id,
      lastname: user.lastname,
      name: user.name,
    });

    if (updated) {
      setTimeout(() => {
        setAddLoading(false);
        setAddSUcess("Perfil actualizado com sucesso");
      }, 3000);
      setTimeout(() => setAddSUcess(""), 6000);
    } else {
      setTimeout(() => {
        setAdErro("Erro ao actualizar o Perfil");
        setAddLoading(false);
      }, 3000);
      setTimeout(() => setAdErro(""), 6000);
    }
  }
  async function editDataCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !credentials.oldEmail ||
      !credentials.oldPassword ||
      !credentials.oldTelefone
    ) {
      setAdErro("Preenche os campos obrigatórios");
      setTimeout(() => setAdErro(""), 3000);
      return;
    }

    setAddLoading(true);
    setAdErro("");
    const finalEmail = credentials.currentEmail || credentials.oldEmail;
    const finalPassword =
      credentials.currentPassowrd || credentials.oldPassword;
    const finalTelefone =
      credentials.currentTelefone || credentials.oldTelefone;

    const payload = {
      currentPassowrd: finalPassword,
      currentTelefone: finalTelefone,
      currentEmail: finalEmail,
      oldEmail: credentials.oldEmail,
      oldTelefone: credentials.oldTelefone,
      oldPassword: credentials.oldPassword,
    };

    const updated = await updateMyCredentials(payload);
    if (updated) {
      setTimeout(() => {
        setAddLoading(false);
        setAddSUcess("Perfil actualizado com sucesso");
      }, 3000);
      setTimeout(() => setAddSUcess(""), 6000);
    } else {
      setTimeout(() => {
        setAdErro("Erro ao actualizar o Perfil");
        setAddLoading(false);
      }, 3000);
      setTimeout(() => setAdErro(""), 6000);
    }
  }
  return (
    <>
      <main className="flex justify-center items-center lg:gap-4 flex-col lg:flex-row">
        <article
          className="p-5 w-[100%] lg:min-h-[400px] flex flex-col gap-4 rounded-sm lg:w-[30%] mt-[45px] lg:mt-0"
          data-aos="zoom-in "
        >
          <h1 className="text-2xl font-bold text-center">Conta</h1>
          <p className="text-center">
            Gerencie suas informações de conta aqui.
          </p>

          <button
            className="w-[50%] flex place-self-center justify-center items-center border border-orange-500 rounded-sm h-[30px] transition"
            onClick={() => {
              setActive("Meus Dados");
              setCredetials({
                currentPassowrd: "",
                currentTelefone: "",
                currentEmail: "",
                oldEmail: "",
                oldTelefone: "",
                oldPassword: "",
                id: 0,
              });
            }}
            id={active == "Meus Dados" ? "active" : ""}
          >
            Meus Dados
          </button>
          <button
            className="w-[50%] flex place-self-center justify-center items-center border border-orange-500 rounded-sm h-[30px] transition"
            id={active == "Credenciais" ? "active" : ""}
            onClick={() => {
              setActive("Credenciais");
              setCredetials({
                currentPassowrd: "",
                currentTelefone: "",
                currentEmail: "",
                oldEmail: "",
                oldTelefone: "",
                oldPassword: "",
                id: 0,
              });
            }}
          >
            Credenciais
          </button>
        </article>
        <aside className="border rounded-sm border-dashed p-5 w-[90%] lg:w-[50%] min-h-[400px] flex flex-col gap-3 items-center">
          {active == "Meus Dados" && (
            <div
              className="flex flex-col gap-1 w-full items-center"
              data-aos="zoom-in"
            >
              <h1 className="text-2xl font-bold text-center">Dados pessoas</h1>
              <form
                action=""
                onSubmit={editData}
                className="flex flex-col gap-3 lg:mb-0 mb-[30px] w-[90%] lg:w-[60%]"
              >
                <label htmlFor="name">Nome</label>
                <input
                  className="border h-[35px] p-2 rounded-sm"
                  type="text"
                  id="name"
                  placeholder="seu nome"
                  value={user.name}
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, name: e.target.value }));
                  }}
                />{" "}
                <label htmlFor="lastname">Sobrenome</label>
                <input
                  id="lastname"
                  className="border h-[35px] p-2 rounded-sm"
                  type="text"
                  placeholder="seu sobrenome"
                  value={user.lastname}
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, lastname: e.target.value }));
                  }}
                />{" "}
                <label htmlFor="desc">Descrição</label>
                <textarea
                  className="border p-2 rounded-sm resize-none"
                  id="desc"
                  placeholder="simples descrição"
                  value={user.bio}
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, bio: e.target.value }));
                  }}
                />
                <button className="bg-orange-400 text-white h-[30px] rounded-full">
                  Salvar <Save size={12} />{" "}
                </button>
                <p className="text-center text-red-400">{addError}</p>
                <p className="text-center text-green-400">{addSucess}</p>
                {addLoading && (
                  <ClipLoader
                    className="flex place-self-center"
                    color="orange"
                  />
                )}
              </form>
            </div>
          )}

          {active == "Credenciais" && (
            <div
              className="flex flex-col gap-1 w-full items-center"
              data-aos="zoom-in"
            >
              <h1 className="text-2xl font-bold text-center">Credencias</h1>
              <form
                action=""
                onSubmit={editDataCredentials}
                className="flex flex-col gap-3 lg:mb-0 mb-[30px] w-[90%] lg:w-[60%]"
              >
                <label htmlFor="name">Novo email</label>
                <input
                  className="border h-[35px] p-2 rounded-sm"
                  type="email"
                  id="name"
                  placeholder="exemplo@novais"
                  onChange={(e) => {
                    setCredetials((prev) => ({
                      ...prev,
                      currentEmail: e.target.value,
                    }));
                  }}
                />{" "}
                <label htmlFor="name">Novo Telefone</label>
                <input
                  className="border h-[35px] p-2 rounded-sm"
                  type="tel"
                  id="name"
                  placeholder="xxx xxx xxx"
                  onChange={(e) => {
                    setCredetials((prev) => ({
                      ...prev,
                      currentTelefone: e.target.value,
                    }));
                  }}
                />{" "}
                <label htmlFor="lastname">Nova senha</label>
                <input
                  id="lastname"
                  className="border h-[35px] p-2 rounded-sm"
                  type="password"
                  placeholder="sua nova senha"
                  onChange={(e) => {
                    setCredetials((prev) => ({
                      ...prev,
                      currentPassowrd: e.target.value,
                    }));
                  }}
                />{" "}
                <label htmlFor="tel">Email</label>
                <input
                  type="email"
                  id="tel"
                  required
                  className="border h-[35px] p-2 rounded-sm"
                  placeholder="exemplo@novais"
                  onChange={(e) => {
                    setCredetials((prev) => ({
                      ...prev,
                      oldEmail: e.target.value,
                    }));
                  }}
                />{" "}
                <label htmlFor="Telefone">Telefone</label>
                <input
                  type="tel"
                  id="Telefone"
                  required
                  name="Telefone"
                  className="border h-[35px] p-2 rounded-sm"
                  placeholder="xxx xxx xxx"
                  onChange={(e) => {
                    setCredetials((prev) => ({
                      ...prev,
                      oldTelefone: e.target.value,
                    }));
                  }}
                />{" "}
                <label htmlFor="desc">Senha</label>
                <input
                  id="lastname"
                  className="border h-[35px] p-2 rounded-sm"
                  type="password"
                  required
                  placeholder="sua senha"
                  onChange={(e) => {
                    setCredetials((prev) => ({
                      ...prev,
                      oldPassword: e.target.value,
                    }));
                  }}
                />
                <button
                  className="bg-orange-400  text-white h-[30px] rounded-full"
                  type="submit"
                >
                  Salvar <Save size={12} />{" "}
                </button>
                <p className="text-center text-red-400">{addError}</p>
                <p className="text-center text-green-400">{addSucess}</p>
                {addLoading && (
                  <ClipLoader
                    className="flex place-self-center"
                    color="orange"
                  />
                )}
              </form>
            </div>
          )}
        </aside>
      </main>
      <RedirectToLogin />
    </>
  );
}
