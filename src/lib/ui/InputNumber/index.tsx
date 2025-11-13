/**
 * InputNumber component stub for Open Studio
 */
import React from 'react'
import { Input } from '../Input'

export const InputNumber = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return <Input {...props} type="number" ref={ref} />
})

InputNumber.displayName = 'InputNumber'
