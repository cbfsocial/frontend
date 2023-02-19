import DeleteIcon from './icons/DeleteIcon'
import { useMemo, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function RepsAndWeights({ id, exercise }) {
  const { reps, weight } = exercise

  const [currentTraining, setCurrentTraining] = useLocalStorage(
    'currentTraining',
    [],
  )

  function handleChange(k, val) {
    if (val.length > 1 && val.startsWith('0')) {
      val = val.slice(1)
    }
    const value = Number(val)
    console.log(value, 1)
    if (isNaN(value)) return
    console.log(value, 5)
    setCurrentTraining((p) =>
      p.map((el) => ({
        ...el,
        finished:
          el.id === id
            ? el.finished.map((f) => ({
                ...f,
                ...(f.id === exercise.id ? { [k]: value } : {}),
              }))
            : el.finished,
      })),
    )
  }

  function handleDelete() {
    setCurrentTraining((prev) =>
      prev
        .map((ex) => ({
          ...ex,
          finished: ex.finished.filter((e) => e.id !== exercise.id),
        }))
        .filter((ex) => ex.finished.length),
    )
  }

  return (
    <div className="flex">
      <input
        className="rounded-lg w-2/3  bg-transparent"
        placeholder="reps"
        onChange={(e) => handleChange('reps', e.target.value)}
        value={reps}
      />
      <input
        className="rounded-lg w-2/3 bg-transparent"
        placeholder="weight"
        onChange={(e) => handleChange('weight', e.target.value)}
        value={weight}
      />
      <button>
        <DeleteIcon
          className="w-6 h-6"
          strokeWidth={1}
          stroke="currentColor"
          onClick={handleDelete}
        />
      </button>
    </div>
  )
}
