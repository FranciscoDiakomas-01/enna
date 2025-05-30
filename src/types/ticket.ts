type ITicket = {
  id: number;
  code: string;
  title: string;
  description: string;
  finished: string;
  status: "Completed" | "Cancelled" | "Pending";
  priority: "High" | "Medium" | "Low";
  files: [];
  created: string;
  updated: string;
};

export default ITicket;
