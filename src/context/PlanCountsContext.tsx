import { createContext, useContext, ReactNode } from 'react'
import {
  usePlanCounts,
  calculateProgress,
  getRemainingText,
  PlanCount,
} from '../hooks/usePlanCounts'

interface PlanCountsContextValue {
  lifetime: PlanCount
  yearly: PlanCount
  loading: boolean
  error: string | null
  lifetimeProgress: number
  yearlyProgress: number
  lifetimeRemainingText: string
  yearlyRemainingText: string
  refetch: () => void
}

const PlanCountsContext = createContext<PlanCountsContextValue | null>(null)

export function PlanCountsProvider({ children }: { children: ReactNode }) {
  const { counts, loading, error, refetch } = usePlanCounts()

  const value: PlanCountsContextValue = {
    lifetime: counts.lifetime,
    yearly: counts.yearly,
    loading,
    error,
    lifetimeProgress: calculateProgress(counts.lifetime.used, counts.lifetime.total),
    yearlyProgress: calculateProgress(counts.yearly.used, counts.yearly.total),
    lifetimeRemainingText: getRemainingText(counts.lifetime.remaining, counts.lifetime.total),
    yearlyRemainingText: getRemainingText(counts.yearly.remaining, counts.yearly.total),
    refetch,
  }

  return <PlanCountsContext.Provider value={value}>{children}</PlanCountsContext.Provider>
}

export function usePlanCountsContext(): PlanCountsContextValue {
  const context = useContext(PlanCountsContext)
  if (!context) {
    throw new Error('usePlanCountsContext must be used within PlanCountsProvider')
  }
  return context
}
