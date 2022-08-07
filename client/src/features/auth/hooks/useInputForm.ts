import React, { useCallback, useState } from 'react'

const useInputForm = (initialValue: string, validation: (str: string) => boolean) => {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState(true)

  const hanldeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(!validation(e.target.value))
    setValue(e.target.value)
  }, [])

  return { value, setValue, hanldeChange, error } as const
}

export default useInputForm
