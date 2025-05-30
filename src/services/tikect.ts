import serverpath from "@/constants/server";

export default async function getALLTicket(page: number = 1) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `ticket?page=${page}`, {
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

export async function getAllTicktByPrioritt(page: number = 1, priorirty: any) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(
      serverpath + `ticket/priority/${priorirty}?page=${page}`,
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

export async function getAllTicktByStatus(page: number = 1, status: any) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(
      serverpath + `ticket/status/${status}?page=${page}`,
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

export async function getAllTicktByID(id: string) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `ticket/code/${id}`, {
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

export async function deleteTicketById(id: string) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `ticket/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data?.message == "Ticket deletado com sucesso";
  } catch (error) {
    return { message: "Erro ao tentar acessar" };
  }
}

export async function createTicketSave(dto: {
  sectorid: number;
  priotity: "Low" | "Medium" | "High";
  fineshed: Date;
  title: string;
  description?: string;
}) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${serverpath}ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });
    const data = await response.json();
    return data?.message == "Ticket Criado com sucesso";
  } catch (error) {
    console.error("Erro ao criar o ticket:", error);
    return false;
  }
}


export async function updateTicket(dto: {
  id: number;
  title: string;
  description?: string;
}) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${serverpath}ticket`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });
    const data = await response.json();
    return data?.message == "Ticket actualizar com sucesso";
  } catch (error) {
    console.error("Erro ao criar o ticket:", error);
    return false;
  }
}
