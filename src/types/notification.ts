type INotification = {
  id: number;
  read: boolean;
  text: string;
  deeplink?: string;
  message: string;
  type: "Task" | "Ticket" | "User" | "Other";
  created : Date
};
