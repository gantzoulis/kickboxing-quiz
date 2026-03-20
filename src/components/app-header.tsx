import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AppHeader() {
  return (
    <header className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="w-10" />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Άνοιγμα μενού">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[280px]">
            <SheetHeader>
              <SheetTitle>Μενού</SheetTitle>
            </SheetHeader>

            <nav className="mt-6 flex flex-col gap-3">
              <Button variant="ghost" className="justify-start">
                Αρχική
              </Button>

              <Button variant="ghost" className="justify-start">
                Τεστ ανά μάθημα
              </Button>

              <Button variant="ghost" className="justify-start">
                Τεστ όλων των μαθημάτων
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-4 flex flex-col items-center text-center">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border bg-white">
          <Image
            src="/pok-logo.png"
            alt="Λογότυπο ΠΟΚ"
            fill
            className="object-contain p-1"
            priority
          />
        </div>

        <h1 className="mt-4 text-xl font-bold tracking-tight">
          Kickboxing Quiz
        </h1>

        <p className="mt-1 text-sm text-slate-600">
          Προπονητική Β΄ Επιπέδου
        </p>
        <p className="mt-1 text-xs font-semibold text-cyan-400 text-slate-600">
          Έκδοση 0.94b
        </p>
        <p className="mt-1 text-xs font-extralight italic text-cyan-400 text-slate-600">
          [G.A All rights reserved]
        </p>
      </div>
    </header>
  );
}
