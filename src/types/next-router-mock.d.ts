/**
 * Type declaration for next-router-mock
 */

declare module 'next-router-mock' {
  import { NextRouter } from 'next/router'
  
  export function createMockRouter(props?: Partial<NextRouter>): NextRouter
  export default createMockRouter
}
