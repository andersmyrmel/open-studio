/**
 * Organizations query stub for Open Studio
 */

export interface Organization {
  id: string
  name: string
  slug: string
}

export const useOrganizationsQuery = () => {
  return {
    data: [],
    isLoading: false,
    error: undefined,
    isSuccess: true,
  }
}
