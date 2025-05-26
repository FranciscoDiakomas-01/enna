"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { HighlightScope } from "@mui/x-charts/context";

export default function BarAnimation() {
  return (
    <Box sx={{ width: "100%" }}>
      <BarChart
        borderRadius={6}
        xAxis={[
          {
            scaleType: "band",
            data: ["Distribuição de Tarefas"],
          },
        ]}
        height={300}
        series={series.slice(0, 5).map((s) => ({ ...s, data: s.data }))}
        skipAnimation={true}
      />
    </Box>
  );
}

const highlightScope: HighlightScope = {
  highlight: "series",
  fade: "global",
};

const series = [
  {
    label: "Concluídas",
    data: [2423],
    color: "#04D361",
  },
  {
    label: "Pendentes",
    data: [2362],
    color: "orange",
  },
  {
    label: "Em progresso",
    data: [344],
    color: "blue",
  },
  {
    label: "Canceladas",
    data: [1145],
    color: "#E83F5B",
  },
].map((s) => ({ ...s, highlightScope }));
