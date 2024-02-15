import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Todo from './Todo.tsx'

describe('<Todo/>', () => {
  test('Renders todo container with correct index', () => {
    const index = 1
    const handleClick = jest.fn()

    render(<Todo index={index} handleClick={handleClick} />)

    const todoElement = screen.getByText(`TODO ${index}`)
    expect(todoElement).toBeInTheDocument()
  })

  test('handleClick function when clicked', () => {
    const index = 1
    const handleClick = jest.fn()

    render(<Todo index={index} handleClick={handleClick} />)

    const todoElement = screen.getByText(`TODO ${index}`)
    fireEvent.click(todoElement)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
