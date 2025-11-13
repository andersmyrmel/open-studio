/**
 * Instance configuration constants for Open Studio
 * Cloud-only compute sizing
 */

export interface ComputeInstance {
  id: string
  name: string
  cpu: number
  memory_gb: number
  connections: number
  price_monthly: number
}

export const COMPUTE_INSTANCES: ComputeInstance[] = [
  {
    id: 'micro',
    name: 'Micro',
    cpu: 1,
    memory_gb: 1,
    connections: 50,
    price_monthly: 0,
  },
  {
    id: 'small',
    name: 'Small',
    cpu: 2,
    memory_gb: 2,
    connections: 100,
    price_monthly: 25,
  },
]
