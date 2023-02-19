import {
  useEffect,
  useReducer,
  createContext,
  useContext,
  useMemo,
} from 'react'

const LocalStorageContext = createContext()

export const LocalStorageProvider = ({ children }) => {
  const [storage, setStorage] = useReducer(
    (st, ac) => ({ ...st, ...(typeof ac === 'function' ? ac(st) : ac) }),
    {},
  )

  function getLocalStorage() {
    const obj = {}
    for (let i = 0, len = localStorage.length; i < len; ++i) {
      const k = localStorage.key(i)
      obj[k] = JSON.parse(localStorage.getItem(k))
    }
    return obj
  }

  useEffect(() => {
    setStorage(getLocalStorage())
  }, [])

  useEffect(() => {
    for (const k in storage) {
      localStorage.setItem(k, JSON.stringify(storage[k]))
    }
  }, [storage])

  return (
    <LocalStorageContext.Provider value={[storage, setStorage]}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export default function useLocalStorage(key, initialState) {
  const [storage, setStorage] = useContext(LocalStorageContext)

  useEffect(() => {
    const item = storage[key]
    if (!item) setStorage((p) => ({ ...p, [key]: initialState }))
  }, [])

  const value = useMemo(() => storage[key] ?? initialState, [storage[key]])

  const setValue = (valOrFunc) => {
    if (typeof valOrFunc === 'function') {
      setStorage((p) => ({ ...p, [key]: valOrFunc(p[key]) }))
    } else {
      setStorage((p) => ({ ...p, [key]: valOrFunc }))
    }
  }

  return [value, setValue]
}
