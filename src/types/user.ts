

type IUser = {
  id: string | number;
  name: string;
  lastname: string;
  email: string;
  telefone?: string;
  area?: string;
  password: string;
  created_at?: string;
  updated_at?: string;
  completed?: number;
  peending?: number;
  canceled?: number;
  total?: number;
};


export default IUser;
