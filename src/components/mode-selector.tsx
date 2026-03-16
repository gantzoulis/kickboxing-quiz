import { BookOpen } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Props = {
  onStart: () => void
}

export function ModeSelector({ onStart }: Props) {
  return (
    <div className="grid gap-4">
      <Card className="rounded-2xl border bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5" />
            Τεστ ανά μάθημα
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-slate-600">
            Διάλεξε ένα μάθημα και κάνε εξάσκηση μόνο στις ερωτήσεις του.
          </p>

          <Button
            className="w-full rounded-xl"
            onClick={onStart}
          >
            Επιλογή μαθήματος
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
