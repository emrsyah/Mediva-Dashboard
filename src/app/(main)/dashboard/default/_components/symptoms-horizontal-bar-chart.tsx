"use client";

import * as React from "react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { symptom: "Mual", value: 250 },
  { symptom: "Pusing", value: 180 },
  { symptom: "Nyeri perut", value: 120 },
  { symptom: "Kelelahan", value: 90 },
  { symptom: "Demam ringan", value: 50 },
];

export function SymptomsHorizontalBarChart() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Gejala yang Sering Dikonsultasikan</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={{}} className="h-[300px] w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" hide domain={[0, "dataMax"]} />
            <YAxis type="category" dataKey="symptom" axisLine={false} tickLine={false} width={100} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={20}>
              <LabelList dataKey="value" position="right" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
