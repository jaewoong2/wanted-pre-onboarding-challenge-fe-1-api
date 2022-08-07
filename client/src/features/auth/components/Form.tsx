import React, { FormHTMLAttributes, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  link?: {
    to?: string
    message?: string
  }
  buttonMessage?: string
  isValidate: boolean
}

const Form = ({
  className,
  link,
  buttonMessage,
  children,
  isValidate,
  ...props
}: PropsWithChildren<Props & FormHTMLAttributes<HTMLFormElement>>) => {
  return (
    <form className={`flex flex-col w-full h-full justify-center ${className}`} {...props}>
      {children}
      <div className="flex items-center justify-between">
        <Link
          className="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-blue-500"
          to={link?.to ?? ''}
        >
          {link?.message}
        </Link>
        <button
          className={`bg-blue text-white bg-blue-500 hover:bg-blue-400 py-2 px-4 rounded ${
            !isValidate ? 'bg-red-400 hover:bg-red-400' : ''
          }`}
          disabled={!isValidate}
          type="submit"
        >
          {buttonMessage}
        </button>
      </div>
    </form>
  )
}

export default Form
