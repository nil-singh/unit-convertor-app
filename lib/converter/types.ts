// Unit types for the converter
export type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'speed' | 'area' | 'data'

export interface Unit {
  id: string
  name: string
  symbol: string
}

export interface ConversionResult {
  value: number | null
  error: string | null
}

// Length units
export const LENGTH_UNITS: Unit[] = [
  { id: 'meter', name: 'Meter', symbol: 'm' },
  { id: 'kilometer', name: 'Kilometer', symbol: 'km' },
  { id: 'centimeter', name: 'Centimeter', symbol: 'cm' },
  { id: 'millimeter', name: 'Millimeter', symbol: 'mm' },
  { id: 'micrometer', name: 'Micrometer', symbol: 'μm' },
  { id: 'nanometer', name: 'Nanometer', symbol: 'nm' },
  { id: 'mile', name: 'Mile', symbol: 'mi' },
  { id: 'yard', name: 'Yard', symbol: 'yd' },
  { id: 'foot', name: 'Foot', symbol: 'ft' },
  { id: 'inch', name: 'Inch', symbol: 'in' },
]

// Weight units
export const WEIGHT_UNITS: Unit[] = [
  { id: 'kilogram', name: 'Kilogram', symbol: 'kg' },
  { id: 'gram', name: 'Gram', symbol: 'g' },
  { id: 'milligram', name: 'Milligram', symbol: 'mg' },
  { id: 'microgram', name: 'Microgram', symbol: 'μg' },
  { id: 'pound', name: 'Pound', symbol: 'lb' },
  { id: 'ounce', name: 'Ounce', symbol: 'oz' },
  { id: 'ton', name: 'Metric Ton', symbol: 't' },
  { id: 'stone', name: 'Stone', symbol: 'st' },
]

// Temperature units
export const TEMPERATURE_UNITS: Unit[] = [
  { id: 'celsius', name: 'Celsius', symbol: '°C' },
  { id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F' },
  { id: 'kelvin', name: 'Kelvin', symbol: 'K' },
]

// Volume units
export const VOLUME_UNITS: Unit[] = [
  { id: 'liter', name: 'Liter', symbol: 'L' },
  { id: 'milliliter', name: 'Milliliter', symbol: 'mL' },
  { id: 'gallon_us', name: 'US Gallon', symbol: 'gal' },
  { id: 'quart_us', name: 'US Quart', symbol: 'qt' },
  { id: 'pint_us', name: 'US Pint', symbol: 'pt' },
  { id: 'cup_us', name: 'US Cup', symbol: 'cup' },
  { id: 'fluid_ounce_us', name: 'US Fl Oz', symbol: 'fl oz' },
  { id: 'tablespoon', name: 'Tablespoon', symbol: 'tbsp' },
  { id: 'teaspoon', name: 'Teaspoon', symbol: 'tsp' },
  { id: 'cubic_meter', name: 'Cubic Meter', symbol: 'm³' },
]

// Speed units
export const SPEED_UNITS: Unit[] = [
  { id: 'meters_per_second', name: 'Meters/sec', symbol: 'm/s' },
  { id: 'kilometers_per_hour', name: 'Km/hour', symbol: 'km/h' },
  { id: 'miles_per_hour', name: 'Miles/hour', symbol: 'mph' },
  { id: 'knot', name: 'Knot', symbol: 'kn' },
  { id: 'feet_per_second', name: 'Feet/sec', symbol: 'ft/s' },
]

// Area units
export const AREA_UNITS: Unit[] = [
  { id: 'square_meter', name: 'Square Meter', symbol: 'm²' },
  { id: 'square_kilometer', name: 'Square Km', symbol: 'km²' },
  { id: 'square_mile', name: 'Square Mile', symbol: 'mi²' },
  { id: 'square_foot', name: 'Square Foot', symbol: 'ft²' },
  { id: 'square_inch', name: 'Square Inch', symbol: 'in²' },
  { id: 'hectare', name: 'Hectare', symbol: 'ha' },
  { id: 'acre', name: 'Acre', symbol: 'ac' },
]

// Data units
export const DATA_UNITS: Unit[] = [
  { id: 'byte', name: 'Byte', symbol: 'B' },
  { id: 'kilobyte', name: 'Kilobyte', symbol: 'KB' },
  { id: 'megabyte', name: 'Megabyte', symbol: 'MB' },
  { id: 'gigabyte', name: 'Gigabyte', symbol: 'GB' },
  { id: 'terabyte', name: 'Terabyte', symbol: 'TB' },
  { id: 'petabyte', name: 'Petabyte', symbol: 'PB' },
  { id: 'bit', name: 'Bit', symbol: 'b' },
  { id: 'kilobit', name: 'Kilobit', symbol: 'Kb' },
  { id: 'megabit', name: 'Megabit', symbol: 'Mb' },
  { id: 'gigabit', name: 'Gigabit', symbol: 'Gb' },
]

// Category metadata for UI
export interface CategoryMeta {
  id: UnitCategory
  name: string
  icon: string
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'length', name: 'Length', icon: 'Ruler' },
  { id: 'weight', name: 'Weight', icon: 'Scale' },
  { id: 'temperature', name: 'Temp', icon: 'Thermometer' },
  { id: 'volume', name: 'Volume', icon: 'Beaker' },
  { id: 'speed', name: 'Speed', icon: 'Gauge' },
  { id: 'area', name: 'Area', icon: 'Square' },
  { id: 'data', name: 'Data', icon: 'HardDrive' },
]

// Get units by category
export function getUnitsByCategory(category: UnitCategory): Unit[] {
  switch (category) {
    case 'length':
      return LENGTH_UNITS
    case 'weight':
      return WEIGHT_UNITS
    case 'temperature':
      return TEMPERATURE_UNITS
    case 'volume':
      return VOLUME_UNITS
    case 'speed':
      return SPEED_UNITS
    case 'area':
      return AREA_UNITS
    case 'data':
      return DATA_UNITS
    default:
      return []
  }
}
