"use client";

import * as React from "react";

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { trimester: "Trimester 1", value: 500 },
  { trimester: "Trimester 2", value: 400 },
  { trimester: "Trimester 3", value: 450 },
];

export function TrimesterLineChart() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Distribusi Trimester Konsultasi</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={{}} className="h-[250px] w-full">
          <LineChart data={data} margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="trimester" axisLine={false} tickLine={false} tickMargin={8} />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="value" stroke="var(--chart-1)" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
