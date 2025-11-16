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

export const useOrgProjectsInfiniteQuery = (variables?: any, options?: any) => {
  return {
    data: {
      pages: [] as any[],
      pageParams: [],
    },
    isLoading: false,
    error: undefined as Error | undefined,
    isSuccess: false,
    isError: false,
    isFetching: false,
    isFetchingNextPage: false,
    fetchNextPage: () => {},
    hasNextPage: false,
  }
}
