/**
 * Organizations query stub for Open Studio
 */

export interface Organization {
  id: number
  name: string
  slug: string
  billing_email: string
  opt_in_tags: never[]
  plan?: {
    id: string
    name: string
  }
}

export const useOrganizationsQuery = () => {
  return {
    data: [],
    isLoading: false,
    error: undefined,
    isSuccess: true,
    isError: false,
  }
}
