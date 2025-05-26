

type IClient = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  gender : "M" | "F" | "P";
  createdAt: string;
  updatedAt: string;
  works : number;
}

export default IClient;