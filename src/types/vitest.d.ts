/**
 * Type declarations for Vitest with @testing-library/jest-dom matchers
 */

import 'vitest'
import type { Assertion, AsymmetricMatchersContaining } from 'vitest'

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R
  toHaveClass(className: string): R
  toHaveAttribute(attr: string, value?: string): R
  toHaveTextContent(text: string | RegExp): R
  toBeVisible(): R
  toBeDisabled(): R
  toBeEnabled(): R
  toHaveValue(value: string | number): R
  toBeChecked(): R
  toHaveFocus(): R
  toBeEmptyDOMElement(): R
  toContainElement(element: HTMLElement | null): R
  toContainHTML(html: string): R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
