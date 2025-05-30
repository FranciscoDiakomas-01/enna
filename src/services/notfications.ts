import serverpath from "@/constants/server";

export default async function getAllMyNotifications(page: string = "1") {
  const token = String(localStorage.getItem("token"));
  const userid = String(localStorage.getItem("userid"));
  try {
    const response = await fetch(
      serverpath + `notification/${userid}?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { message: "Erro ao tentar acessar" };
  }
}

export async function countNotification() {
  const token = String(localStorage.getItem("token"));
  const userid = String(localStorage.getItem("userid"));
  try {
    const response = await fetch(serverpath + `notification/count/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data?.notifications ? data?.notifications : 0
  } catch (error) {
    return 0
  }
}
