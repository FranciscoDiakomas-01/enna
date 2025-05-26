type ITask = {
  id: number;
  ticket_id: number | String;
  tech_id: number;
  description: string;
  date_start: string;
  date_end: string;
  time_spent: number;
  status: "Pendente" | "Em andamento" | "Concluída" | "Cancelada";
  notes: string;
  attachments: string[];
  created_at: string;
  updated_at: string;
};
