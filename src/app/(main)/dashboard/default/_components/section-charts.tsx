import { MedicationPieChart } from "./medication-pie-chart";
import { PatientRiskBarChart } from "./patient-risk-bar-chart";
import { ChartAreaInteractive } from "./chart-area-interactive";
import { TrimesterLineChart } from "./trimester-line-chart";
import { SymptomsHorizontalBarChart } from "./symptoms-horizontal-bar-chart";

export function SectionCharts() {
  const palette = {
    "--chart-1": "#4257E2",
    "--chart-2": "#E3A8E4",
    "--chart-3": "#58A6F0",
    "--color-desktop": "#4257E2",
    "--color-mobile": "#E3A8E4",
  } as React.CSSProperties;

  return (
    <div
      className="grid grid-cols-1 gap-4 @2xl/main:grid-cols-3"
      style={palette}
    >
      {/* first row */}
      <MedicationPieChart />
      <PatientRiskBarChart />
      <ChartAreaInteractive />

      {/* second row */}
      <div className="@container/card col-span-1 @2xl/main:col-span-2">
        <TrimesterLineChart />
      </div>
      <SymptomsHorizontalBarChart />
    </div>
  );
}
