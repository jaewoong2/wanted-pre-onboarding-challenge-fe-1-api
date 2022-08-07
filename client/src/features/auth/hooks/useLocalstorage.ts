import { useCallback, useEffect, useState } from 'react'

const useLocalstorage = <T = unknown>(keyItem?: string) => {
  const [data, setData] = useState<T | null>(null)

  const setStorage = useCallback((key: string, value: T) => {
    if (window) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [])

  const getStorage = useCallback((key: string) => {
    const value = localStorage.getItem(key)
    if (value) {
      const item = JSON.parse(value)
      setData(item)
    } else {
      setData(null)
    }
  }, [])

  useEffect(() => {
    getStorage(keyItem ?? '')
  }, [])

  return { data, setStorage, getStorage }
}

export default useLocalstorage
