'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Unit } from '@/lib/converter/types'

interface UnitSelectorProps {
  units: Unit[]
  value: string
  onChange: (value: string) => void
  label: string
  disabledValue?: string
}

export function UnitSelector({ units, value, onChange, label, disabledValue }: UnitSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder="Select unit" />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit) => {
            const isDisabled = unit.id === disabledValue
            return (
              <SelectItem
                key={unit.id}
                value={unit.id}
                disabled={isDisabled}
                className={isDisabled ? 'opacity-40' : 'cursor-pointer'}
              >
                <span className="flex items-center gap-2">
                  <span>{unit.name}</span>
                  <span className="text-muted-foreground">({unit.symbol})</span>
                </span>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
