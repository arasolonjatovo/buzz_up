import React from 'react'
import './InputText.scss'

interface InputTextProps {
  type: string
  desc: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  icon: string
}

const InputText = ({ type, desc, value, onChange, icon }: InputTextProps) => {
  const inputStyle = {
    backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
      icon
    )}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '5px 50%',
    paddingLeft: '25px',
  }

  return (
    <div className="inputContainer">
      <input
        type={type}
        placeholder={desc}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </div>
  )
}

export default InputText
