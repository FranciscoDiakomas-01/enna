
type IUserAPI = {
  id: number;
  name: string;
  lastname: string;
  bio: string;
  email: string;
  tel: string;
  type: "Tecnic";
  sector: {
    title: string;
  }
  taskStats: {
    pending: number;
    cancelled: number;
    completed: number;
  };
};

export default IUserAPI;