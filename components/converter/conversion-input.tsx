'use client'

import { useCallback, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { Unit } from '@/lib/converter/types'

interface ConversionInputProps {
  value: string
  onChange: (value: string) => void
  unit: Unit | undefined
  label: string
  error?: string | null
  disabled?: boolean
}

export function ConversionInput({
  value,
  onChange,
  unit,
  label,
  error,
  disabled = false,
}: ConversionInputProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = useCallback(() => {
    if (!value) return
    const raw = value.replace(/,/g, '')
    navigator.clipboard.writeText(raw).then(() => {
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 1500)
    })
  }, [value])

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <Input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          disabled={disabled}
          className={`pr-20 text-base font-medium tabular-nums ${
            disabled ? 'cursor-default bg-muted/40' : ''
          } ${
            error
              ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20'
              : ''
          }`}
          aria-invalid={!!error}
          aria-label={`${label} value`}
        />

        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {/* Copy button for result field */}
          {disabled && value && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Copy result"
              title="Copy to clipboard"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          )}
          {unit && (
            <span className="select-none text-sm font-medium text-muted-foreground">
              {unit.symbol}
            </span>
          )}
        </div>
      </div>
      <div className="min-h-[1.25rem]">
        {error && (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
