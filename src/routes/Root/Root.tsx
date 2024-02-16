import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../../layout/Header/Header'

import './Root.scss'

export default function Root() {
  return (
    <>
      <Header />
      <div id="details">
        <Outlet />
      </div>
    </>
  )
}
