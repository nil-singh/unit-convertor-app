import type { ConversionResult, UnitCategory } from './types'

// Length conversion factors (to meters)
const LENGTH_TO_METER: Record<string, number> = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  micrometer: 1e-6,
  nanometer: 1e-9,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
}

// Weight conversion factors (to kilograms)
const WEIGHT_TO_KG: Record<string, number> = {
  kilogram: 1,
  gram: 0.001,
  milligram: 1e-6,
  microgram: 1e-9,
  pound: 0.453592,
  ounce: 0.0283495,
  ton: 1000,
  stone: 6.35029,
}

// Volume conversion factors (to liters)
const VOLUME_TO_LITER: Record<string, number> = {
  liter: 1,
  milliliter: 0.001,
  gallon_us: 3.78541,
  quart_us: 0.946353,
  pint_us: 0.473176,
  cup_us: 0.236588,
  fluid_ounce_us: 0.0295735,
  tablespoon: 0.0147868,
  teaspoon: 0.00492892,
  cubic_meter: 1000,
}

// Speed conversion factors (to m/s)
const SPEED_TO_MPS: Record<string, number> = {
  meters_per_second: 1,
  kilometers_per_hour: 1 / 3.6,
  miles_per_hour: 0.44704,
  knot: 0.514444,
  feet_per_second: 0.3048,
}

// Area conversion factors (to square meters)
const AREA_TO_SQM: Record<string, number> = {
  square_meter: 1,
  square_kilometer: 1e6,
  square_mile: 2.59e6,
  square_foot: 0.092903,
  square_inch: 0.00064516,
  hectare: 10000,
  acre: 4046.86,
}

// Data conversion factors (to bytes)
const DATA_TO_BYTE: Record<string, number> = {
  byte: 1,
  kilobyte: 1024,
  megabyte: 1024 ** 2,
  gigabyte: 1024 ** 3,
  terabyte: 1024 ** 4,
  petabyte: 1024 ** 5,
  bit: 1 / 8,
  kilobit: 1024 / 8,
  megabit: (1024 ** 2) / 8,
  gigabit: (1024 ** 3) / 8,
}

// Absolute zero in different units
const ABSOLUTE_ZERO: Record<string, number> = {
  celsius: -273.15,
  fahrenheit: -459.67,
  kelvin: 0,
}

// Generic ratio-based conversion
function convertByFactor(
  value: number,
  fromUnit: string,
  toUnit: string,
  factors: Record<string, number>
): number {
  const fromFactor = factors[fromUnit]
  const toFactor = factors[toUnit]
  if (fromFactor === undefined || toFactor === undefined) {
    throw new Error(`Unknown unit: ${fromUnit} or ${toUnit}`)
  }
  return (value * fromFactor) / toFactor
}

// Convert temperature with proper edge case handling
function convertTemperature(value: number, fromUnit: string, toUnit: string): ConversionResult {
  // Check for values below absolute zero
  const absZero = ABSOLUTE_ZERO[fromUnit]
  if (absZero === undefined) {
    return { value: null, error: 'Invalid temperature unit' }
  }

  if (value < absZero) {
    const symbol = fromUnit === 'kelvin' ? 'K' : `°${fromUnit.charAt(0).toUpperCase()}`
    return {
      value: null,
      error: `Cannot go below absolute zero (${absZero}${symbol})`,
    }
  }

  if (fromUnit === toUnit) {
    return { value, error: null }
  }

  // Convert to Celsius first
  let celsius: number
  switch (fromUnit) {
    case 'celsius':
      celsius = value
      break
    case 'fahrenheit':
      celsius = (value - 32) * (5 / 9)
      break
    case 'kelvin':
      celsius = value - 273.15
      break
    default:
      return { value: null, error: 'Invalid temperature unit' }
  }

  // Convert from Celsius to target unit
  let result: number
  switch (toUnit) {
    case 'celsius':
      result = celsius
      break
    case 'fahrenheit':
      result = celsius * (9 / 5) + 32
      break
    case 'kelvin':
      result = celsius + 273.15
      break
    default:
      return { value: null, error: 'Invalid temperature unit' }
  }

  return { value: result, error: null }
}

// Validate input string
export function validateInput(value: string): { isValid: boolean; error: string | null } {
  if (value === '' || value === '-') {
    return { isValid: true, error: null }
  }

  // Reject multiple decimal points
  if ((value.match(/\./g) || []).length > 1) {
    return { isValid: false, error: 'Invalid number format' }
  }

  const num = parseFloat(value)

  if (isNaN(num)) {
    return { isValid: false, error: 'Please enter a valid number' }
  }

  if (!isFinite(num)) {
    return { isValid: false, error: 'Value is too large or too small' }
  }

  // Guard against absurdly large input
  if (Math.abs(num) > Number.MAX_SAFE_INTEGER) {
    return { isValid: false, error: 'Value exceeds safe precision' }
  }

  return { isValid: true, error: null }
}

// Categories that don't allow negative values
const NON_NEGATIVE_CATEGORIES: UnitCategory[] = ['length', 'weight', 'volume', 'speed', 'area', 'data']

// Main conversion function
export function convert(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: UnitCategory
): ConversionResult {
  // Same-unit shortcut
  if (fromUnit === toUnit) {
    return { value, error: null }
  }

  // Negative check for categories that don't support it
  if (NON_NEGATIVE_CATEGORIES.includes(category) && value < 0) {
    const label = category.charAt(0).toUpperCase() + category.slice(1)
    return { value: null, error: `${label} cannot be negative` }
  }

  try {
    switch (category) {
      case 'length':
        return { value: convertByFactor(value, fromUnit, toUnit, LENGTH_TO_METER), error: null }
      case 'weight':
        return { value: convertByFactor(value, fromUnit, toUnit, WEIGHT_TO_KG), error: null }
      case 'temperature':
        return convertTemperature(value, fromUnit, toUnit)
      case 'volume':
        return { value: convertByFactor(value, fromUnit, toUnit, VOLUME_TO_LITER), error: null }
      case 'speed':
        return { value: convertByFactor(value, fromUnit, toUnit, SPEED_TO_MPS), error: null }
      case 'area':
        return { value: convertByFactor(value, fromUnit, toUnit, AREA_TO_SQM), error: null }
      case 'data':
        return { value: convertByFactor(value, fromUnit, toUnit, DATA_TO_BYTE), error: null }
      default:
        return { value: null, error: 'Invalid category' }
    }
  } catch {
    return { value: null, error: 'Conversion error — unknown unit' }
  }
}

// Format result for display
export function formatResult(value: number | null): string {
  if (value === null) return ''
  if (value === 0) return '0'

  // Handle very small numbers
  if (Math.abs(value) > 0 && Math.abs(value) < 0.000001) {
    return value.toExponential(6)
  }

  // Handle very large numbers
  if (Math.abs(value) > 999_999_999_999) {
    return value.toExponential(6)
  }

  // Round to reasonable precision
  const rounded = Math.round(value * 1_000_000) / 1_000_000
  return rounded.toLocaleString('en-US', { maximumFractionDigits: 6 })
}
