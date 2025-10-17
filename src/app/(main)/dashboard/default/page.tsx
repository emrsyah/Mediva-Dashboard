import { SectionCards } from "./_components/section-cards";
import { SectionCharts } from "./_components/section-charts";
import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <SectionCharts />
      <DataTable data={data} />
    </div>
  );
}
