"use client";

import * as React from "react";

import { Pie, PieChart, Cell, Label } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { name: "Pereda Nyeri", value: 65, color: "var(--chart-1)" },
  { name: "Herbal Ringan", value: 15, color: "var(--chart-2)" },
  { name: "Antasida", value: 20, color: "var(--chart-3)" },
];

export function MedicationPieChart() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Obat yang Sering Dikonsumsi</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ChartContainer config={{}} className="mx-auto h-[220px] w-full sm:w-[280px]">
          <PieChart className="m-0" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-sm">
                        Total
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <ChartLegend layout="horizontal" />
      </CardContent>
    </Card>
  );
}
