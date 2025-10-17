import z from "zod";

export const patientSchema = z.object({
  id: z.number(),
  name: z.string(),
  pregnancyAge: z.string(), // e.g., "Trimester 1"
  lastConsult: z.string(), // e.g., "07 Jan 2025, 09:12 AM"
  risk: z.enum([
    "Risiko Tinggi",
    "Risiko Sedang",
    "Risiko Rendah",
    "Risiko Potensial",
    "Dalam Pemantauan",
    "Normal",
    "Arsip",
  ]),
  medicationHistory: z
    .array(
      z.object({
        name: z.string(),
        date: z.string(),
        reason: z.string(),
      })
    )
    .optional(),
  statusChanges: z
    .array(
      z.object({
        from: z.string(),
        to: z.string(),
        date: z.string(),
        note: z.string().optional(),
      })
    )
    .optional(),
  examinations: z
    .array(
      z.object({
        date: z.string(),
        summary: z.string(),
        diagnosis: z.string().optional(),
      })
    )
    .optional(),
  riskNotes: z
    .array(z.string())
    .optional(),
});
