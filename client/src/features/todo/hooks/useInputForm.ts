import React, { useCallback, useState } from 'react'

const useInputForm = (initialValue?: string) => {
  const [value, setValue] = useState(initialValue || '')

  const hanldeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return [value, setValue, hanldeChange] as const
}

export default useInputForm
