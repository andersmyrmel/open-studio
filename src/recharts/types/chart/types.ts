/**
 * Recharts types stub for Open Studio
 * Re-exports from recharts main package
 */

export interface CategoricalChartState {
  activeTooltipIndex?: number
  isTooltipActive?: boolean
  activeLabel?: string
  activePayload?: any[]
  activeCoordinate?: {
    x: number
    y: number
  }
}

// Add other types as needed
export type ChartOffset = {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}
