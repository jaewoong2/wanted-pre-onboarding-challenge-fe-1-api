import { useCallback, useEffect, useState } from 'react'

const useLocalstorage = <T extends unknown, A extends unknown[] = unknown[]>(
  keyItem?: string,
  effectDeps?: A
) => {
  const [data, setData] = useState<T | null>(null)

  const setStorage = useCallback((key: string, value: T) => {
    if (window) {
      localStorage.setItem(key, JSON.stringify(value))
      setData(value)
    }
  }, [])

  const getStorage = useCallback(
    async (
      key: string,
      options?: { onSuccess?: (data: T | null) => void; onError?: (msg?: string) => void }
    ) => {
      const value = localStorage.getItem(key)
      if (value) {
        const item = await JSON.parse(value)
        setData(item)
        if (options?.onSuccess) {
          options?.onSuccess(item)
        }
      } else {
        setData(null)
        if (options?.onError) {
          options?.onError('localstorage 에 key 가 없습니다')
        }
      }
    },
    []
  )

  useEffect(() => {
    getStorage(keyItem ?? '')
  }, effectDeps ?? [])

  return { data, setStorage, getStorage }
}

export default useLocalstorage
