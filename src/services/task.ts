import serverpath from "@/constants/server";
const TOKEN = "SEU_TOKEN_AQUI";

// ADMIN
export async function getAllTask(page: string = "1") {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `task?page=${+page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      data: [],
      lastPage: 0,
      total: 0,
      page: 0,
    };
  }
}
export async function getAllTaskByStatus(page: string = "1"  ,  status : string) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `task/allbystatus/${status}?page=${+page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      data: [],
      lastPage: 0,
      total: 0,
      page: 0,
    };
  }
}
export async function getAllTaskBySearch(page: string = "1" , search : string) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(
      serverpath + `task?page=${+page}&search=${search}`,
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
  } catch (err) {
    return {
      data: [],
      lastPage: 0,
      total: 0,
      page: 0,
    };
  }
}


export async function getTaskById(id : number) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `task/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      data: {},
    };
  }
}
export async function deleteTaskById(id: number) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data?.message == "tarefa eliminada com sucesso";
  } catch (err) {
    return false
  }
}
export async function createTaskSave(dto: {
  title: string;
  description: string;
  owerId: number;
  ticketid: number;
}) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${serverpath}task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });
    const data = await response.json();
    console.log(data);
    return data?.message == "tarefa craida com sucesso" ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
