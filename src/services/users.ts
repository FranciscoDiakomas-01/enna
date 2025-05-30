const serverpath = "https://sua-api.com/api";
const TOKEN = "SEU_TOKEN_AQUI";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

export async function getAlluser(page : string = "1")  {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `user?page=${+page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data
  } catch (err) {
    return {
      data: [],
      lastPage: 0,
      total: 0,
      page: 0,
    };
  }
}


export async function getEmployeeById(id: number) {
  const res = await fetch(`${serverpath}/user/${id}`, {
    headers,
  });
  return res.json();
}


export async function createEmployee(data: any) {
  const res = await fetch(`${serverpath}/user`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}


export async function updateEmployee(id: number, data: any) {
  const res = await fetch(`${serverpath}/user/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}


export async function deleteEmployee(id: number) {
  const res = await fetch(`${serverpath}/user/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.ok;
}
