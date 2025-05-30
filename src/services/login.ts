import serverpath from "@/constants/server";

export default async function Login(email: string, password: string) {
  try {
    const response = await fetch(serverpath + "auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!data?.accessToken || !data?.user) {
      return { message: "Credenciais inválidas" };
    }
    const { accessToken, user } = data;
    localStorage.setItem("token", accessToken);
    localStorage.setItem("userid", user.id);
    localStorage.setItem("usertype", user.type);
    return { message: "Logado com sucesso" };
  } catch (error) {
    console.log(error)
    return { message: "Erro ao fazer login" };
  }
}
