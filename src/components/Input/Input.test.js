import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Input from './Input';

test('Renders input with label and calls onChange function when value changes', () => {
  const label = 'Username';
  const inputValue = 'test value'
  const onChange = jest.fn()
  const inputRef = React.createRef()

  render(
    <Input
      label={label}
      inputRef={inputRef}
      onChange={onChange}
    />
  );

  const labelElement = screen.getByText(label)
  expect(labelElement).toBeInTheDocument()

  const inputElement = screen.getByRole('textbox')
  fireEvent.change(inputElement, { target: { value: inputValue } })

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(inputElement).toHaveValue(inputValue)
});
