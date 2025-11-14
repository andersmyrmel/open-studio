/**
 * Org projects infinite query stub for Open Studio
 */

export interface OrgProject {
  id: string
  name: string
  ref: string
  status: string
  organization_id: string
}

export const useOrgProjectsInfiniteQuery = () => {
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
    isSuccess: false,
    fetchNextPage: () => {},
    hasNextPage: false,
  }
}
