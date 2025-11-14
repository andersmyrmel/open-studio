/**
 * Organization context stubs for standalone mode
 *
 * In standalone mode, there is no organization concept.
 */

export const DEFAULT_ORGANIZATION = {
  id: 1,
  slug: 'default',
  name: 'Open Studio',
  billing_email: 'local@open-studio.dev',
  opt_in_tags: [],
  plan: {
    id: 'free',
    name: 'Free',
  },
}

/**
 * Stub hook that returns a default organization for compatibility
 */
export function useSelectedOrganizationQuery() {
  return {
    data: DEFAULT_ORGANIZATION,
    isLoading: false,
    isError: false,
    error: null,
  }
}
