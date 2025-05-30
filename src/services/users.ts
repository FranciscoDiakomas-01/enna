import serverpath from "@/constants/server";

export async function getAlluser(page: string = "1") {
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
export async function getAlluserNames() {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `user/name/names`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return {
      data: [],
    };
  }
}
export async function createUserSave(dto: {
  name: string;
  lastname: string;
  email: string;
  tel: string;
  sectorid: number;
  bio: string;
}) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${serverpath}user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });
    const data = await response.json();
    return data?.created ? true : false;
  } catch (error) {
    return false;
  }
}


export async function getAlluserByPattern(page: string = "1" , search : string) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `user?page=${+page}&search=${search}`, {
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

export async function deleteUserById(id: number) {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath + `user/${+id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data?.deleted ? true : false;
  } catch (err) {
    return false;
  }
}

export async function getMyData() {
  const token = String(localStorage.getItem("token"));
  const userid = String(localStorage.getItem("userid"));
  try {
    const response = await fetch(serverpath + `user/${userid}`, {
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
    };
  }
}

export async function updateMProfile(dto: {
  name: string;
  lastname: string;
  bio: string;
  id: number;
}) {
  const token = localStorage.getItem("token");
  const userid = String(localStorage.getItem("userid"));
  dto.id = Number(userid);
  try {
    const response = await fetch(`${serverpath}user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });
    const data = await response.json();
    return data?.updated ? true : false;
  } catch (error) {
    return false;
  }
}

export async function updateMyCredentials(dto: {
  currentPassowrd: string;
  currentTelefone: string;
  currentEmail: string;
  oldEmail: string;
  oldTelefone: string;
  oldPassword: string;
  id?: number;
}) {
  const token = localStorage.getItem("token");
  const userid = String(localStorage.getItem("userid"));
  dto.id = Number(userid);
  try {
    const response = await fetch(`${serverpath}user/credentials`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });
    const data = await response.json();
    console.log(data)
    return data?.message == "updated" ? true : false;
  } catch (error) {
    console.log(error)
    return false;
  }
}
