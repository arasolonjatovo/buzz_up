import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import InputText from './InputText'

test('Renders input with placeholder and calls onChange function when value changes', () => {
  const placeholder = 'Enter your username'
  const inputValue = 'test value'
  const onChange = jest.fn()
  const icon = ''

  render(
    <InputText
      type="text"
      desc={placeholder}
      value={inputValue}
      onChange={onChange}
      icon={icon}
    />
  )

  const inputElement = screen.getByPlaceholderText(placeholder)
  expect(inputElement).toBeInTheDocument()

  fireEvent.change(inputElement, { target: { value: inputValue } })

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(inputElement).toHaveValue(inputValue)
})
