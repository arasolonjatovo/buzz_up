import React, { MouseEventHandler } from 'react'

import './Button.scss'

type Props = {
  label: string
  variant: string
  handleClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ label, variant, handleClick }: Props) {
  return (
    <button className={`button ${variant}`} onClick={handleClick}>
      {label}
    </button>
  )
}
