
import { z } from 'zod/v4'

// Helper to handle comma-separated strings from URL or single values
const commaStringToArray = z.preprocess((val) => {
  if (!val || val === '') return []
  if (Array.isArray(val)) return val
  return String(val).split(',')
}, z.array(z.string()))

// Helper to handle boolean strings from URL
const stringToBoolean = z.preprocess((val) => {
  if (val === 'true') return true
  if (val === 'false') return false
  return undefined
}, z.boolean().optional())

export const ParkFilterSchema = z.object({
  q: z.string().default(''), // searchQuery
  f: stringToBoolean.default(false), // fenced
  s: stringToBoolean.default(false), // shade
  r: stringToBoolean.default(false), // restrooms
  sw: stringToBoolean.default(false), // babySwings
  st: stringToBoolean.default(false), // strollerFriendly
  t: z.array(z.string()).optional(), // single terrain selection
  p: z.array(z.string()).optional(), // parking
  age: commaStringToArray.pipe(z.array(z.string())).default([]),
})


// The "Default" state for resetting
export const DEFAULT_FILTERS = ParkFilterSchema.parse({})
export type ParkFilters = typeof DEFAULT_FILTERS
