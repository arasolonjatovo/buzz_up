import React, { MouseEventHandler } from 'react'

import './Todo.scss'

type Props = {
  handleClick: MouseEventHandler<HTMLButtonElement>
  index: number
}

export default function Todo({ handleClick, index }: Props) {
  return (
    <article className="todo__container" onClick={handleClick}>
      <h2 className="todo__title">TODO {index}</h2>
    </article>
  )
}
