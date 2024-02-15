import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button'

describe('<Button />', () => {
  test('Renders button with correct label and variant', () => {
    const label = 'Click me'
    const variant = 'primary'
    const handleClick = jest.fn()

    render(<Button label={label} variant={variant} handleClick={handleClick} />)

    const buttonElement = screen.getByText(label)
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveClass('button')
    expect(buttonElement).toHaveClass(variant)
  })

  test('handleClick function when clicked', () => {
    const label = 'Click me'
    const variant = 'primary'
    const handleClick = jest.fn()

    render(<Button label={label} variant={variant} handleClick={handleClick} />)

    const buttonElement = screen.getByText(label)
    fireEvent.click(buttonElement)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
