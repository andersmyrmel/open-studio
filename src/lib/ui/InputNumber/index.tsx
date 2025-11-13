/**
 * InputNumber component stub for Open Studio
 */
import React from 'react'
import { Input } from '../Input'
import type { Props as InputProps } from '../Input/Input'

export const InputNumber = React.forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>((props, ref) => {
  return <Input {...props} type="number" inputRef={ref} />
})

InputNumber.displayName = 'InputNumber'
