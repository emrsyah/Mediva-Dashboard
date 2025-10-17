import { TrendingUp, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @4xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ibu Hamil Terpantau</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">125</CardTitle>
          <CardAction>
            <Badge style={{ backgroundColor: "#E3A8E4", color: "#4257E2" }}>
              <TrendingUp />
              +1.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Dibandingkan 2 hari kemarin</div>
          <div className="font-medium">Pasien dalam seminggu <span className="tabular-nums">250</span></div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Peringatan Aktif</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">82</CardTitle>
          <CardAction>
            <Badge style={{ backgroundColor: "#E3A8E4", color: "#4257E2" }}>
              <TrendingDown />
              -2.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Dibandingkan 3 hari kemarin</div>
          <div className="font-medium">Peringatan dalam seminggu <span className="tabular-nums">27</span></div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Aktivitas Konsultasi</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">125</CardTitle>
          <CardAction>
            <Badge style={{ backgroundColor: "#E3A8E4", color: "#4257E2" }}>
              <TrendingUp />
              +12%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Dibandingkan kemarin</div>
          <div className="font-medium">Pasien unik dalam seminggu <span className="tabular-nums">86</span></div>
        </CardFooter>
      </Card>
    </div>
  );
}
