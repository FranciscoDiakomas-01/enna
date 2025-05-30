import serverpath from "@/constants/server";


export default async function getMyDashBoard() {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + "dash", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    const data = await response.json()
    return data
  } catch (error) {
    return { message : "Erro ao tentar acessar"}
  }
  
}