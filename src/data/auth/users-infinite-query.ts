/**
 * Users infinite query stub for Open Studio
 */

export const useUsersInfiniteQuery = () => {
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
    fetchNextPage: () => {},
    hasNextPage: false,
  }
}
