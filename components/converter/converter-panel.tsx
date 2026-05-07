'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { UnitSelector } from './unit-selector'
import { ConversionInput } from './conversion-input'
import { SwapButton } from './swap-button'
import { convert, formatResult, validateInput } from '@/lib/converter/conversions'
import { getUnitsByCategory, type UnitCategory } from '@/lib/converter/types'

interface ConverterPanelProps {
  category: UnitCategory
}

export function ConverterPanel({ category }: ConverterPanelProps) {
  const units = useMemo(() => getUnitsByCategory(category), [category])

  const [fromUnit, setFromUnit] = useState(units[0]?.id ?? '')
  const [toUnit, setToUnit] = useState(units[1]?.id ?? '')
  const [inputValue, setInputValue] = useState('')
  const [outputValue, setOutputValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Reset state when category changes
  useEffect(() => {
    const newUnits = getUnitsByCategory(category)
    setFromUnit(newUnits[0]?.id ?? '')
    setToUnit(newUnits[1]?.id ?? '')
    setInputValue('')
    setOutputValue('')
    setError(null)
  }, [category])

  // Perform conversion
  const performConversion = useCallback(
    (value: string, from: string, to: string) => {
      if (value === '' || value === '-') {
        setOutputValue('')
        setError(null)
        return
      }

      const validation = validateInput(value)
      if (!validation.isValid) {
        setError(validation.error)
        setOutputValue('')
        return
      }

      const numValue = parseFloat(value)
      if (isNaN(numValue)) {
        setError('Please enter a valid number')
        setOutputValue('')
        return
      }

      // Same-unit case — just echo value
      if (from === to) {
        setError(null)
        setOutputValue(formatResult(numValue))
        return
      }

      const result = convert(numValue, from, to, category)

      if (result.error) {
        setError(result.error)
        setOutputValue('')
      } else {
        setError(null)
        setOutputValue(formatResult(result.value))
      }
    },
    [category]
  )

  // Handle input change — filter to valid numeric characters only
  const handleInputChange = (value: string) => {
    // Allow empty, negative sign, numbers, decimal
    if (value !== '' && !/^-?\d*\.?\d*$/.test(value)) {
      return
    }
    // Prevent multiple leading zeros (allow "0." though)
    if (/^-?0\d/.test(value) && !value.startsWith('0.') && !value.startsWith('-0.')) {
      return
    }
    setInputValue(value)
    performConversion(value, fromUnit, toUnit)
  }

  // Handle unit changes — auto-correct if same unit selected
  const handleFromUnitChange = (unit: string) => {
    let newToUnit = toUnit
    // If selecting the same as toUnit, swap them
    if (unit === toUnit) {
      newToUnit = fromUnit
      setToUnit(newToUnit)
    }
    setFromUnit(unit)
    performConversion(inputValue, unit, newToUnit)
  }

  const handleToUnitChange = (unit: string) => {
    let newFromUnit = fromUnit
    // If selecting the same as fromUnit, swap them
    if (unit === fromUnit) {
      newFromUnit = toUnit
      setFromUnit(newFromUnit)
    }
    setToUnit(unit)
    performConversion(inputValue, newFromUnit, unit)
  }

  // Swap units
  const handleSwap = () => {
    const newFromUnit = toUnit
    const newToUnit = fromUnit
    setFromUnit(newFromUnit)
    setToUnit(newToUnit)

    // If there's a valid output, make it the new input
    if (outputValue && !error) {
      const cleanValue = outputValue.replace(/,/g, '')
      setInputValue(cleanValue)
      performConversion(cleanValue, newFromUnit, newToUnit)
    } else {
      performConversion(inputValue, newFromUnit, newToUnit)
    }
  }

  const fromUnitData = units.find((u) => u.id === fromUnit)
  const toUnitData = units.find((u) => u.id === toUnit)

  // Build formula string
  const formulaText = useMemo(() => {
    if (!fromUnitData || !toUnitData || fromUnit === toUnit) return null
    // Compute a "1 from = X to" reference
    const ref = convert(1, fromUnit, toUnit, category)
    if (ref.error || ref.value === null) return null
    return `1 ${fromUnitData.symbol} = ${formatResult(ref.value)} ${toUnitData.symbol}`
  }, [fromUnit, toUnit, fromUnitData, toUnitData, category])

  return (
    <div className="flex flex-col gap-5">
      {/* Unit Selectors */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <UnitSelector
            units={units}
            value={fromUnit}
            onChange={handleFromUnitChange}
            label="From"
            disabledValue={toUnit}
          />
        </div>
        <div className="flex justify-center py-1 sm:pb-0.5">
          <SwapButton onClick={handleSwap} />
        </div>
        <div className="flex-1">
          <UnitSelector
            units={units}
            value={toUnit}
            onChange={handleToUnitChange}
            label="To"
            disabledValue={fromUnit}
          />
        </div>
      </div>

      {/* Formula reference */}
      {formulaText && (
        <div className="rounded-md border border-dashed bg-muted/30 px-3 py-2 text-center text-xs tabular-nums text-muted-foreground">
          {formulaText}
        </div>
      )}

      {/* Input/Output Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <ConversionInput
          value={inputValue}
          onChange={handleInputChange}
          unit={fromUnitData}
          label="Value"
          error={error}
        />
        <ConversionInput
          value={outputValue}
          onChange={() => {}}
          unit={toUnitData}
          label="Result"
          disabled
        />
      </div>
    </div>
  )
}
