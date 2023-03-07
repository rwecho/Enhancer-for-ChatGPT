import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type NumberInputProps = {
  value: number
  precision?: number
  step?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
}

// access precision input with dot
export const NumberInput = (props: NumberInputProps) => {
  const { value, onChange, precision, step, min, max } = props
  const [num, setNum] = useState('')

  useEffect(() => {
    setNum(value.toString())
  }, [value])

  const handleChange = (valueAsString: string) => {
    setNum(valueAsString)

    onChange && onChange(parseFloat(valueAsString))
  }

  return (
    <ChakraNumberInput
      precision={precision}
      step={step}
      value={num}
      onChange={(valueAsString) => handleChange(valueAsString)}
      min={min}
      max={max}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChakraNumberInput>
  )
}
