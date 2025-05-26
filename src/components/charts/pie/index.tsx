import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Concluidos", value: 400 },
  { label: "Pendentes", value: 300 },
  { label: "Cancelados", value: 300 },
  { label: "Em progresso", value: 200 },
];

export default function ChartPie() {
  return (
    <PieChart
      series={[
        {
          paddingAngle: 5,
          innerRadius: 40,
          outerRadius: 80,
          data,
        },
      ]}
      width={300}
      height={200}
    />
  );
}
