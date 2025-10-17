"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { patientColumns } from "./columns.patients";
import { patientsData } from "./patients.config";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileUp } from "lucide-react";

const riskExtraClass: Record<string, string> = {
  "Risiko Sedang": "bg-yellow-500 text-white dark:bg-yellow-400 dark:text-black",
};

const riskVariant: Record<string, React.ComponentProps<typeof Badge>["variant"]> = {
  "Risiko Tinggi": "destructive",
  "Risiko Sedang": "secondary",
};

export function PatientTable({ data }: { data: any[] }) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Inject a leading toggle column
  const columns: ColumnDef<any, any>[] = [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) => (
        <button
          className="flex size-6 items-center justify-center text-muted-foreground transition-transform"
          onClick={() =>
            setExpandedRows((prev) => ({ ...prev, [row.id]: !prev[row.id] }))
          }
        >
          <ChevronRight
            className={`size-4 transition-transform ${
              expandedRows[row.id] ? "rotate-90" : ""
            }`}
          />
          <span className="sr-only">Toggle row</span>
        </button>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...patientColumns,
  ];

  const table = useDataTableInstance({
    data,
    columns,
    defaultPageSize: 12,
    getRowId: (row) => row.id.toString(),
  });

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan} className="first:w-8">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              const patient = row.original as any;
              return (
                <>
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                  {expandedRows[row.id] && (
                    <TableRow key={`${row.id}-expanded`} className="bg-muted/50">
                      <TableCell colSpan={columns.length} className="p-4">
                        <div className="relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-px before:bg-border/60 flex flex-col gap-6">
                          {/* Status change */}
                          {patient.statusChanges?.map((sc: any, idx: number) => (
                            <div key={idx} className="flex flex-col gap-1">
                              <div className="absolute -left-1.5 top-1.5 flex size-3 rounded-full bg-primary" />
                              <p className="text-sm font-medium flex items-center gap-2">
                                Status risiko berubah dari
                                <Badge
                                  variant={riskVariant[sc.from] ?? "secondary"}
                                  className={riskExtraClass[sc.from]}
                                  >
                                  {sc.from}
                                </Badge>
                                menjadi
                                <Badge
                                  variant={riskVariant[sc.to] ?? "secondary"}
                                  className={`ml-1 ${riskExtraClass[sc.to] ?? ""}`}
                                >
                                  {sc.to}
                                </Badge>{" "}
                                <span className="text-muted-foreground text-sm">pada {sc.date}</span>
                              </p>
                              {sc.note && <p className="text-sm text-muted-foreground pl-4">{sc.note}</p>}
                            </div>
                          ))}

                          {/* Medication */}
                          <div>
                            <div className="absolute -left-1.5 mt-1 flex size-3 rounded-full bg-primary" />
                            <h4 className="font-semibold text-sm mb-2">Obat & Swamedikasi</h4>
                            {patient.medicationHistory?.length ? (
                              <ul className="pl-4 list-disc space-y-1 text-sm">
                                {patient.medicationHistory.map((m: any, idx: number) => (
                                  <li key={idx}>
                                    <strong>{m.name}</strong> — terakhir konsumsi {m.date}, alasan: {m.reason}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground pl-4">Tidak ada riwayat.</p>
                            )}
                          </div>

                          {/* Examination */}
                          <div>
                            <div className="absolute -left-1.5 mt-1 flex size-3 rounded-full bg-primary" />
                            <h4 className="font-semibold text-sm mb-2">Riwayat Pemeriksaan</h4>
                            {patient.examinations?.length ? (
                              <ul className="pl-4 list-disc space-y-1 text-sm">
                                {patient.examinations.map((ex: any, idx: number) => (
                                  <li key={idx}>
                                    {ex.date} — {ex.summary}{" "}
                                    {ex.diagnosis && <em>Diagnosa: {ex.diagnosis}</em>}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground pl-4">Belum ada pemeriksaan.</p>
                            )}
                          </div>

                          {/* Risk notes */}
                          {patient.riskNotes?.length && (
                            <div>
                              <div className="absolute -left-1.5 mt-1 flex size-3 rounded-full bg-primary" />
                              <h4 className="font-semibold text-sm mb-2">Catatan Risiko / Peringat</h4>
                              <ul className="pl-4 list-disc space-y-1 text-sm">
                                {patient.riskNotes.map((n: string, idx: number) => (
                                  <li key={idx}>{n}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Additional info form */}
                          <div className="flex flex-col gap-3">
                            <h4 className="font-semibold text-sm">Informasi Medis Tambahan</h4>
                            <div className="flex gap-2">
                              <Input placeholder="Contoh: Alergi kacang, riwayat hipertensi…" className="flex-1" />
                              <Button size="sm">Simpan</Button>
                            </div>
                            <Separator decorative className="my-1" />
                            <div className="flex flex-col gap-2">
                              <Button variant="outline" size="sm" className="gap-2 w-fit">
                                <FileUp className="size-4" /> Unggah file medis
                              </Button>
                              <p className="text-xs text-muted-foreground">Hasil laboratorium, rekam medis, atau catatan pemeriksaan</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
