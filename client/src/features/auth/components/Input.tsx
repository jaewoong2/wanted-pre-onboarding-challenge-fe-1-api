import React, { InputHTMLAttributes, PropsWithChildren } from 'react'

type Props = {
  label?: string
}

const Input = ({
  label,
  id,
  className,
  ...props
}: PropsWithChildren<Props & InputHTMLAttributes<HTMLInputElement>>) => {
  return (
    <label className="flex flex-col mb-2" htmlFor={id}>
      <span className="pb-2">{label}</span>
      <input
        className={`shadow border rounded py-3 px-3 ${className}`}
        id={id}
        type="email"
        placeholder="Email"
        required
        {...props}
      />
    </label>
  )
}

export default React.memo(Input)
