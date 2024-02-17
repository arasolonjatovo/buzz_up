import React, { ChangeEvent, RefObject } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Input.scss'

type Props = {
  label?: string
  placeholder?: string
  name?: string
  id?: string
  value?: string | number
  type?: string
  inputRef?: RefObject<HTMLInputElement>
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  icon?: any
  onClickIcon?: () => void
}

export default function Input({
  label,
  placeholder,
  name,
  id,
  value,
  type,
  inputRef,
  onChange,
  required,
  icon,
  onClickIcon,
}: Props) {
  return (
    <div className="input__container">
      <label htmlFor={label}>{label}</label>
      <div className="input">
        {icon && (
          <FontAwesomeIcon
            className="input-icon"
            onClick={onClickIcon}
            icon={icon}
          />
        )}
        <input
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          type={type}
          ref={inputRef}
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  )
}
