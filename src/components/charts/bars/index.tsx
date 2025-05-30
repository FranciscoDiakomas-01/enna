"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { HighlightScope } from "@mui/x-charts/context";

export default function BarAnimation({ value }: { value: number[] }) {
  const highlightScope: HighlightScope = {
    highlight: "series",
    fade: "global",
  };

  const labels = ["Concluídas", "Pendentes", "Em progresso", "Canceladas"];
  const colors = ["#04D361", "orange", "blue", "#E83F5B"];

  const series = value.map((val, index) => ({
    label: labels[index],
    data: [val], 
    color: colors[index],
    highlightScope,
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <BarChart
        borderRadius={6}
        xAxis={[
          {
            scaleType: "band",
            data: ["Distribuição de Tarefas"], // um único grupo
          },
        ]}
        height={300}
        series={series}
        skipAnimation={true}
      />
    </Box>
  );
}
