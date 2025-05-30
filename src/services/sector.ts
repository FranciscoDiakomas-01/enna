import serverpath from "@/constants/server";

export default async function getAllSectors() {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `sector`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { message: "Erro ao tentar acessar" };
  }
}

export async function deteleteSector(id: number) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `sector/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data?.deleted ? true : false;
  } catch (error) {
    return false;
  }
}

export async function createSector(body: {
  title: string;
  description: string;
}) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + "sector", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data?.created ? true : false
  } catch (err) {
    return false;
  }
}


export async function updateSector(body: { title: string; description: string, id  : number}) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + "sector", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data?.updated ? true : false;
  } catch (err) {
    return false;
  }
}