/**
 * @testing-library/react stub for Open Studio
 * Minimal stub for test files - tests not run in production
 */

export function render(component: any, options?: any): any {
  return {
    container: null,
    baseElement: null,
    debug: () => {},
    rerender: () => {},
    unmount: () => {},
    asFragment: () => null,
  }
}

export function renderHook<TResult, TProps>(
  callback: (props: TProps) => TResult,
  options?: any
): any {
  return {
    result: { current: null },
    rerender: () => {},
    unmount: () => {},
  }
}

export const screen = {
  getByText: (text: any, options?: any) => null,
  getByRole: (role: any, options?: any) => null,
  getByLabelText: (text: any, options?: any) => null,
  getByPlaceholderText: (text: any, options?: any) => null,
  getByAltText: (text: any, options?: any) => null,
  getByTestId: (id: any, options?: any) => null,
  queryByText: (text: any, options?: any) => null,
  queryByRole: (role: any, options?: any) => null,
  findByText: async (text: any, options?: any) => null,
  findByRole: async (role: any, options?: any) => null,
}

export const fireEvent = Object.assign(
  (element: any, event: any): void => {
    // No-op stub
  },
  {
    click: (element: any, options?: any): void => {},
    change: (element: any, options?: any): void => {},
    input: (element: any, options?: any): void => {},
    submit: (element: any, options?: any): void => {},
    focus: (element: any, options?: any): void => {},
    blur: (element: any, options?: any): void => {},
    keyDown: (element: any, options?: any): void => {},
    keyUp: (element: any, options?: any): void => {},
    keyPress: (element: any, options?: any): void => {},
    mouseEnter: (element: any, options?: any): void => {},
    mouseLeave: (element: any, options?: any): void => {},
  }
)

export function waitFor(callback: () => void, options?: any): Promise<void> {
  return Promise.resolve()
}

export function act(callback: () => void): Promise<void> {
  return Promise.resolve()
}

export function cleanup(): void {
  // No-op stub
}
