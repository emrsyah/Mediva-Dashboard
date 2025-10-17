# Mediva Dashboard

Mediva Dashboard is a patient-centric monitoring and analytics tool built with Next.js 15, TypeScript, Tailwind CSS v4, and Shadcn UI. It ships with **two ready-made workspaces**:

1. **Patient Data (`/dashboard/data-pasien`)** – a full-featured table view for browsing, searching, and exporting patient records. It groups patients by risk category ("Risiko Tinggi", "Dalam Pemantauan", etc.) and shows warning toasts when high-risk cases appear.
2. **Default Overview (`/dashboard/default`)** – an executive summary with KPI cards and interactive charts (medication mix, risk distribution, symptoms, trimester trends, and a visitors area chart) that highlight trends in real time.

<p align="center">
  <img src="media/dashboard.png" alt="Mediva Dashboard Screenshot" width="800" />
</p>

## Key Features

- Patient table with column resizing, sorting, filtering, pagination, and CSV export.
- Risk-based tabs that display live badge counts and visual toast alerts for high-risk patients.
- KPI cards that surface high-level metrics at a glance.
- Fully interactive Recharts visualisations: pie, bar, line, and area charts.
- Theme toggling (light / dark) and multiple color presets (Tangerine, Neo Brutalism, Soft Pop, Shadcn Neutral).
- Responsive layout with collapsible sidebar and mobile-first design.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **State & Forms**: React Hook Form, Zustand
- **Charts**: Recharts
- **Tables**: TanStack Table

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-org/mediva-dashboard.git
cd mediva-dashboard
npm install
```

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000/dashboard/default` for the overview or `http://localhost:3000/dashboard/data-pasien` for the patient view.

---

Contributions and feedback are welcome – feel free to open an issue or start a discussion.
