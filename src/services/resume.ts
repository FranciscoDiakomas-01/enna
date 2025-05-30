import serverpath from "@/constants/server";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import IResume from "@/types/Resume";
export default async function getResume() {
  const token = String(localStorage.getItem("token"));
  try {
    const response = await fetch(serverpath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data?.length > 0) {
      const FinalData = data as IResume[];
      generateAdminReportPDF(FinalData);
    }
    return data;
  } catch (error) {
    return { message: "Erro ao tentar acessar" };
  }
}

export function generateAdminReportPDF(data: IResume[]) {
  const doc = new jsPDF();
  let totalMade = 0;
  let totalPending = 0;
  let totalCompleted = 0;
  let totalCancelled = 0;
  let totalWorking = 0;

  data.forEach((x) => {
    totalMade += x.totalTasks;
    totalPending += x.pending;
    totalCompleted += x.completed;
    totalCancelled += x.cancelled;
    totalWorking += x.working;
  });

  doc.setFontSize(18);
  doc.text("Relatório de Tarefas - Admin", 14, 20);

  doc.setFontSize(12);
  doc.text(`Total de Tarefas: ${data.forEach((value) => {})}`, 14, 30);
  doc.text(`Concluídas: ${totalMade}`, 14, 36);
  doc.text(`Pendentes: ${totalPending}`, 14, 42);
  doc.text(`Em Progresso: ${totalWorking}`, 14, 48);
  doc.text(`Canceladas: ${totalCancelled}`, 14, 54);

  autoTable(doc, {
    startY: 65,
    head: [
      [
        "Nome",
        "Total de Tarefas",
        "Concluídas",
        "Pendentes",
        "Canceladas",
        "Em progresso",
      ],
    ],
    body: data.map((user) => [
      user.name,
      user.totalTasks.toString(),
      user.completed,
      user.pending,
      user.cancelled,
      user.working,
    ]),
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [22, 160, 133],
      textColor: 255,
    },
  });
  doc.save(`EnnaResume-${new Date().toDateString() + "---" + Date.now}.pdf`);
}
