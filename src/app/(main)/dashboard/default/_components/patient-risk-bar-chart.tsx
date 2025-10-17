"use client";

import * as React from "react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { level: "Tinggi", value: 60 },
  { level: "Sedang", value: 35 },
  { level: "Rendah", value: 100 },
];

export function PatientRiskBarChart() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Risiko Pasien</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={{}} className="h-[250px] w-full">
          <BarChart data={data} margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="level" axisLine={false} tickLine={false} tickMargin={8} />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="var(--chart-1)">
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
