type ITask = {
  id: number;
  ticketId?: number;
  status: "Cancelled" | "Working" | "Completed" | "Pending";
  title: string;
  description: string;
  created?: Date;
  updated?: Date;
  finished?: Date;
};
