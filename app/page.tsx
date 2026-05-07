"use client";

import { useState } from "react";
import {
  Ruler,
  Scale,
  Thermometer,
  Beaker,
  Gauge,
  Square,
  HardDrive,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ConverterPanel } from "@/components/converter/converter-panel";
import { CATEGORIES, type UnitCategory } from "@/lib/converter/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Ruler,
  Scale,
  Thermometer,
  Beaker,
  Gauge,
  Square,
  HardDrive,
};

export default function UnitConverterPage() {
  const [activeCategory, setActiveCategory] = useState<UnitCategory>("length");

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-6 sm:px-8 sm:py-10">
      <Card className="w-full max-w-xl overflow-hidden shadow-sm">
        <CardHeader className="space-y-1 pb-4 text-center">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Unit Converter
          </h1>

          <p className="text-sm text-muted-foreground">
            Quick, precise conversions across 7 categories
          </p>

          <p className="text-xs text-muted-foreground/80">
            Note: Negative values are supported only for Temperature
            conversions, representing temperatures below the freezing point of
            water (0°C) down to absolute zero (-273.15°C).
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Category pills — horizontally scrollable on mobile */}
          <div
            className="-mx-6 flex gap-1.5 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
            role="tablist"
            aria-label="Conversion categories"
          >
            {CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon];
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2
                    text-xs font-semibold uppercase tracking-wide
                    transition-all duration-200 select-none
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }
                  `}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div id={`panel-${activeCategory}`} role="tabpanel">
            <ConverterPanel key={activeCategory} category={activeCategory} />
          </div>
        </CardContent>
      </Card>

      <footer className="mt-4 text-center text-xs text-muted-foreground/60">
        Built with Next.js &middot; All conversions are instant &amp; offline
      </footer>
    </main>
  );
}
