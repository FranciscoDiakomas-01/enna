type ITicket = {
  id: number;
  code: string;
  title: string;
  description: string;
  client_id: number;
  date_end: string;
  status: "Conpleted" | "Cancelled" | "Pedding";
  priority: "Higth" | "Medium" | "Low";
  files: [];
  created_at: string;
  updated_at: string;
};

export default ITicket;
