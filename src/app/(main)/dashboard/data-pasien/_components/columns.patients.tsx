import { ColumnDef } from "@tanstack/react-table";
import z from "zod";
import { EllipsisVertical } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { patientSchema } from "./schema";

const riskVariants: Record<string, React.ComponentProps<typeof Badge>["variant"]> = {
  "Risiko Tinggi": "destructive", // red
  "Risiko Sedang": "secondary", // will override with yellow class
  "Risiko Rendah": "outline",
  "Risiko Potensial": "secondary",
  "Dalam Pemantauan": "secondary",
  Normal: "secondary",
  Arsip: "secondary",
};

const riskExtraClass: Record<string, string> = {
  "Risiko Sedang": "bg-yellow-500 text-white  dark:bg-yellow-300",
};

export const patientColumns: ColumnDef<z.infer<typeof patientSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <span className="tabular-nums">{row.original.id}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Pasien" />,
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "pregnancyAge",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Usia Kehamilan" />,
    cell: ({ row }) => <Badge variant="secondary">{row.original.pregnancyAge}</Badge>,
  },
  {
    accessorKey: "lastConsult",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Terakhir Konsultasi" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.lastConsult}</span>,
  },
  {
    accessorKey: "risk",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Peringatan Dini" />,
    cell: ({ row }) => (
      <Badge
        variant={riskVariants[row.original.risk] ?? "secondary"}
        className={riskExtraClass[row.original.risk]}
      >
        {row.original.risk}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell patient={row.original} />,
    enableSorting: false,
  },
];

// -------------------- Helper components --------------------

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ActionCellProps {
  patient: z.infer<typeof patientSchema>;
}

const recommendations = [
  {
    title: "Anemia Ringan",
    content: "Berikan suplemen Fe 1x sehari dan kontrol 2 minggu.",
  },
  {
    title: "Hipertensi Kehamilan",
    content: "Monitor tekanan darah tiap minggu, hindari garam berlebih.",
  },
];

function ActionCell({ patient }: ActionCellProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setOpen(true)}>
            Create Clinical Recommendation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rangkuman Klinis: {patient.name}</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-2">
          <div className="bg-muted p-3 rounded-md flex flex-col gap-1">
            <span className="text-sm font-semibold">Identitas Pasien:</span>
            <span className="text-sm">
              <b>Nama:</b> {patient.name}
              <span className="mx-2">|</span>
              <b>Kehamilan:</b> {patient.pregnancyAge}
            </span>
            <span className="text-sm">
              <b>Konsultasi Terakhir:</b> {patient.lastConsult}
            </span>
            <span className="text-sm">
              <b>Status Risiko:</b>{" "}
              <span className={
                patient.risk === 'Risiko Tinggi' 
                  ? 'text-red-600 font-bold'
                  : patient.risk === 'Risiko Sedang'
                  ? 'text-yellow-600 font-bold'
                  : 'text-green-600 font-bold'
              }>
                {patient.risk}
              </span>
            </span>
          </div>
          {patient.examinations?.length ? (
            <div className="bg-muted p-3 rounded-md flex flex-col gap-1">
              <span className="text-sm font-semibold mb-1">Ringkasan Pemeriksaan:</span>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {patient.examinations.map((ex, idx) => (
                  <li key={idx}>
                    <b>{ex.date}:</b> {ex.summary}
                    {ex.diagnosis && <> <em className="ml-1 text-muted-foreground">({ex.diagnosis})</em></>}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-muted p-3 rounded-md text-sm">
              <span className="font-semibold">Ringkasan Pemeriksaan:</span> Belum ada pemeriksaan tercatat.
            </div>
          )}
          {patient.medicationHistory?.length ? (
            <div className="bg-muted p-3 rounded-md flex flex-col gap-1">
              <span className="text-sm font-semibold mb-1">Riwayat Obat & Swamedikasi:</span>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {patient.medicationHistory.map((m, idx) => (
                  <li key={idx}>
                    {m.name} <span className="text-muted-foreground">(terakhir konsumsi {m.date}, alasan: {m.reason})</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-muted p-3 rounded-md text-sm">
              <span className="font-semibold">Riwayat Obat & Swamedikasi:</span> Tidak ada riwayat.
            </div>
          )}
          {patient.statusChanges?.length ? (
            <div className="bg-muted p-3 rounded-md flex flex-col gap-1">
              <span className="text-sm font-semibold mb-1">Perubahan Status Risiko:</span>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {patient.statusChanges.map((sc, idx) => (
                  <li key={idx}>
                    <b>{sc.date}:</b> {sc.from} <span className="mx-1">&rarr;</span> {sc.to}
                    {sc.note && <span className="block pl-2 text-muted-foreground italic">{sc.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {patient.riskNotes?.length ? (
            <div className="bg-muted p-3 rounded-md flex flex-col gap-1">
              <span className="text-sm font-semibold mb-1">Catatan Klinis & Risiko:</span>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {patient.riskNotes.map((n, idx) => (
                  <li key={idx}>{n}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="bg-background border rounded-md p-3">
            <span className="block font-semibold text-sm mb-1">Rangkuman & Rekomendasi:</span>
            <div className="text-sm space-y-2">
              <div>
                Berdasarkan evaluasi data klinis, <b>{patient.name}</b> terkategori sebagai <b>{patient.risk}</b>.
                {patient.examinations?.length
                  ? " Pemeriksaan terakhir menujukkan hasil berikut: "
                  : ""}
                {patient.examinations?.[0]?.summary
                  ? <span>{patient.examinations[0].summary} </span>
                  : ""}
              </div>
              {patient.risk === "Risiko Tinggi" && (
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <b>Monitoring Ketat:</b> Pemantauan tekanan darah dan status vital maternal tiap minggu. Pantau gejala preeklamsia seperti edema, sakit kepala, atau gangguan penglihatan.
                  </li>
                  <li>
                    <b>Tata Laksana Farmakologis:</b> Jika anemia: <span className="italic">Ferrous sulfate 60 mg/hari PO</span> + vitamin C. Jika hipertensi: diskusikan pencanangan antihipertensi (mis. <span className="italic">methyldopa</span>) sesuai protokol kehamilan.
                  </li>
                  <li>
                    <b>Konseling Gizi & Istirahat:</b> Anjurkan pola makan tinggi zat besi dan asam folat, serta istirahat cukup.
                  </li>
                  <li>
                    <b>Kunjungan Ulang:</b> Kontrol ulang minimal 2 minggu atau segera jika terjadi perburukan klinis.
                  </li>
                </ul>
              )}
              {patient.risk === "Risiko Sedang" && (
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <b>Observasi dan Monitoring:</b> Lanjutkan pemantauan kehamilan secara rutin dan pencatatan tanda vital.
                  </li>
                  <li>
                    <b>Suplementasi:</b> Berikan <span className="italic">tablet Fe</span> sesuai kebutuhan, dan lanjutkan edukasi pola hidup sehat.
                  </li>
                  <li>
                    <b>Evaluasi Berkala:</b> Lakukan pemeriksaan laboratorium bila perlu dan follow-up sesuai protokol.
                  </li>
                </ul>
              )}
              {patient.risk === "Risiko Rendah" && (
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <b>Perawatan Antenatal Rutin:</b> Lanjutkan kontrol <span className="italic">antenatal care</span> setiap bulan, suplementasi asam folat, serta skrining faktor risiko baru.
                  </li>
                  <li>
                    <b>Pendidikan Kesehatan:</b> Edukasi ibu untuk mengenali tanda bahaya kehamilan dan menjaga gaya hidup sehat.
                  </li>
                </ul>
              )}
              <div>
                <b>Rekomendasi Umum:</b> Selalu anjurkan hidrasi yang cukup, asupan nutrisi optimal, dan segera konsultasi ulang jika muncul keluhan akut seperti perdarahan, nyeri hebat, atau penurunan pergerakan janin.
              </div>
            </div>
            {patient.riskNotes?.length ? (
              <ul className="list-disc pl-5 mt-2 text-xs text-muted-foreground space-y-1">
                {patient.riskNotes.map((n, idx) => (
                  <li key={idx}>{n}</li>
                ))}
              </ul>
            ) : null}
            <div className="mt-4">
              <span className="text-xs text-muted-foreground">
                <b>Pernyataan kepada Dokter:</b><br />
                <span>
                  Rekomendasi klinis ini dihasilkan secara otomatis berdasarkan data pasien melalui sistem AI. Pendekatan menggunakan istilah dan protokol klinis terkini—termasuk opsi tata laksana farmakologis seperti suplementasi <i>Fe</i>, antihipertensi selektif, serta edukasi gizi dan monitoring. Rekomendasi ini bersifat pendukung dan tidak menggantikan clinical judgement.
                </span>
                <br />
                <i>
                  *Mohon lakukan validasi, konfirmasi diagnosis, serta pertimbangan individual masing-masing pasien sebelum pengambilan keputusan klinis atau terapi lebih lanjut. Laporan AI hanya sebagai bahan pertimbangan dan referensi profesional, bukan instruksi definitif.
                </i>
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
