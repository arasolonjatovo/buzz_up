import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoEmailList from './TodoEmailList'

describe('<TodoEmailList/>', () => {
  test('Renders email list container with correct heading', () => {
    const mails = [
      { ID: '1', email: 'test@example.com' },
      { ID: '2', email: 'another@example.com' },
    ]

    render(<TodoEmailList mails={mails} />)

    const headingElement = screen.getByText(
      'See who has access to my to do 👀 :'
    )
    expect(headingElement).toBeInTheDocument()

    mails.forEach((mail) => {
      const emailElement = screen.getByText(mail.email)
      expect(emailElement).toBeInTheDocument()
    })
  })

  test('Calls addEmail function when button is clicked', () => {
    const mails = [
      { ID: '1', email: 'test@example.com' },
      { ID: '2', email: 'another@example.com' },
    ]
    const addEmail = jest.fn()

    render(<TodoEmailList mails={mails} />)

    const addButton = screen.getByText('ADD EMAIL')
    fireEvent.click(addButton)

    expect(addEmail).toHaveBeenCalledTimes(1)
  })
})
