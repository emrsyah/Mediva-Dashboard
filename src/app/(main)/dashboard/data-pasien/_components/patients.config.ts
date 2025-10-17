import { z } from "zod";
import { patientSchema } from "./schema";

type Patient = z.infer<typeof patientSchema>;

export const patientsData: Patient[] = [
  {
    id: 1,
    name: "Nabila Putri",
    pregnancyAge: "Trimester 1",
    lastConsult: "07 Jan 2025, 09:12 AM",
    risk: "Risiko Tinggi",
    medicationHistory: [
      { name: "Paracetamol", date: "12 Mei 2025", reason: "sakit kepala" },
      { name: "Vitamin C", date: "10 Mei 2025", reason: "jaga daya tahan tubuh" },
    ],
    statusChanges: [
      {
        from: "Risiko Tinggi",
        to: "Risiko Sedang",
        date: "16 Feb 2025, 11:37 AM",
        note: "Pasien tidak lagi melaporkan gejala nyeri hebat dan tekanan darah stabil",
      },
      {
        from: "Risiko Sedang",
        to: "Risiko Tinggi",
        date: "01 Mar 2025, 09:20 AM",
        note: "Gejala kembali memburuk, pasien mengeluh pusing dan tekanan darah menurun.",
      },
    ],
    examinations: [
      {
        date: "16 May 2025, 11:37 AM",
        summary: "Pemeriksaan rutin trimester awal. TD: 120/80, BB: 50 kg",
        diagnosis: "Anemia ringan. Tindak lanjut: Diberi suplemen Fe, kontrol 2 minggu lagi",
      },
    ],
    riskNotes: [
      "Pasien masuk kategori risiko tinggi: anemia + kehamilan trimester awal",
      "Anjurkan kontrol rutin & cek darah berkala",
    ],
  },
  {
    id: 2,
    name: "Alisha Rahma",
    pregnancyAge: "Trimester 1",
    lastConsult: "18 Feb 2025, 03:45 PM",
    risk: "Risiko Sedang",
    medicationHistory: [
      { name: "Ibuprofen", date: "02 Feb 2025", reason: "nyeri punggung ringan" },
    ],
    examinations: [
      {
        date: "20 Feb 2025, 10:15 AM",
        summary: "USG trimester awal. Semua parameter normal",
      },
    ],
  },
  {
    id: 3,
    name: "Citra Ayu",
    pregnancyAge: "Trimester 2",
    lastConsult: "12 Mar 2025, 11:08 AM",
    risk: "Risiko Sedang",
  },
  {
    id: 4,
    name: "Hana Zahra",
    pregnancyAge: "Trimester 1",
    lastConsult: "25 Mar 2025, 04:27 PM",
    risk: "Risiko Tinggi",
  },
  {
    id: 5,
    name: "Indira Safira",
    pregnancyAge: "Trimester 3",
    lastConsult: "09 Apr 2025, 10:56 AM",
    risk: "Risiko Tinggi",
  },
  {
    id: 6,
    name: "Laras Wulan",
    pregnancyAge: "Trimester 3",
    lastConsult: "21 Mei 2025, 02:33 PM",
    risk: "Risiko Rendah",
  },
  {
    id: 7,
    name: "Maya Anindya",
    pregnancyAge: "Trimester 3",
    lastConsult: "03 Jun 2025, 08:41 AM",
    risk: "Risiko Rendah",
  },
  {
    id: 8,
    name: "Rani Prameswari",
    pregnancyAge: "Trimester 1",
    lastConsult: "15 Jul 2025, 01:19 PM",
    risk: "Risiko Rendah",
  },
  {
    id: 9,
    name: "Salsabila Noor",
    pregnancyAge: "Trimester 1",
    lastConsult: "29 Agu 2025, 05:22 PM",
    risk: "Risiko Tinggi",
  },
  {
    id: 10,
    name: "Tiara Anggraini",
    pregnancyAge: "Trimester 2",
    lastConsult: "10 Sep 2025, 09:37 AM",
    risk: "Risiko Sedang",
  },
  {
    id: 11,
    name: "Vania Kartika",
    pregnancyAge: "Trimester 2",
    lastConsult: "19 Sep 2025, 02:14 PM",
    risk: "Risiko Sedang",
  },
  {
    id: 12,
    name: "Zahira Aulia",
    pregnancyAge: "Trimester 2",
    lastConsult: "27 Sep 2025, 11:50 AM",
    risk: "Risiko Tinggi",
  },
];
