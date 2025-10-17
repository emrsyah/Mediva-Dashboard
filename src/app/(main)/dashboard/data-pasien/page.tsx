"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

import { patientColumns } from "./_components/columns.patients";
import { patientsData } from "./_components/patients.config";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { PatientTable } from "./_components/patient-table";

const RISK_CATEGORIES = [
  "All",
  "Risiko Tinggi",
  "Risiko Potensial",
  "Dalam Pemantauan",
  "Normal",
  "Arsip",
] as const;

type RiskCategory = (typeof RISK_CATEGORIES)[number];

export default function Page() {
  const [category, setCategory] = useState<RiskCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    let filtered = patientsData;
    if (category !== "All") {
      filtered = filtered.filter((p) => p.risk === category);
    }
    if (searchQuery.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [category, searchQuery]);

  const table = useDataTableInstance({
    data: filteredData,
    columns: patientColumns,
    defaultPageSize: 12,
    getRowId: (row) => row.id.toString(),
  });

  // Show warning toast once on initial load if there are high-risk patients
  useEffect(() => {
    const highRiskPatients = patientsData.filter(
      (p) => p.risk === "Risiko Tinggi"
    );

    if (highRiskPatients.length > 0) {
      toast.warning(
        `Nabila Putri menjadi pasien dalam kategori risiko tinggi. Periksa kembali data pasien dan lakukan tindakan yang sesuai.`
      );
    }
    // we intentionally run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Counts per category for badge counts in tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<RiskCategory, number> = {
      All: patientsData.length,
      "Risiko Tinggi": 0,
      "Risiko Potensial": 0,
      "Dalam Pemantauan": 0,
      Normal: 0,
      Arsip: 0,
    } as Record<RiskCategory, number>;
    patientsData.forEach((p) => {
      counts[p.risk as RiskCategory]++;
    });
    return counts;
  }, []);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Top controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Category Tabs */}
        <Tabs
          value={category}
          onValueChange={(val) => setCategory(val as RiskCategory)}
          className="w-full sm:w-fit"
        >
          <TabsList>
            {RISK_CATEGORIES.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="px-3 py-1 text-sm">
                {cat} {cat === "All" ? categoryCounts[cat] : <span className="ml-1">{categoryCounts[cat]}</span>}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Search + Export */}
        <div className="ml-auto flex w-full items-center gap-2 sm:w-fit">
          <Input
            placeholder="Cari data pasien"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:w-64"
          />
          <DataTableViewOptions table={table} />
          <Button variant="outline" size="sm">
            <Download />
            <span className="hidden lg:inline">Unduh data pasien</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <PatientTable data={filteredData} />
    </div>
  );
}