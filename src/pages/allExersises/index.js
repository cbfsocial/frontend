import { useMemo, useState } from 'react'
import data from '../../data/data.json'
import Link from 'next/link'
import Plus from '@/components/icons/PlusIcon'
import AddExerciseBar from '@/components/AddExerciseBar'
import useLocalStorage from '@/hooks/useLocalStorage'
import { v4 as uuid } from 'uuid'

export default function All() {
  const [searchInput, setSearchInput] = useState('')
  const [currentTraining, setCurrentTraining] = useLocalStorage(
    'currentTraining',
    [],
  )

  const handleAdding = (event, exercise) => {
    event.preventDefault()

    setCurrentTraining((prev) => [
      ...prev,
      ...(prev.find((el) => el.id === exercise.id)
        ? []
        : [
            {
              ...exercise,
              finished: [
                {
                  id: uuid(),
                  reps: 0,
                  weight: 0,
                },
              ],
            },
          ]),
    ])
  }

  const list = useMemo(
    () =>
      data
        .filter((el) =>
          el.name.toLowerCase().includes(searchInput.toLowerCase()),
        )
        .reduce(
          (acc, el) => ({
            ...acc,
            [el.muscle]: [...(acc[el.muscle] ?? []), el],
          }),
          {},
        ),
    [searchInput],
  )

  const memoizedList = useMemo(() => {
    return Object.entries(list).map(([k, v]) => (
      <div key={k}>
        <h2 className="text-white text-2xl border-b-2">{k}</h2>
        <div className="flex gap-2 flex-wrap">
          {v.map((el) => (
            <Link href={`allExersises/${el.id}`} key={el.id}>
              <span
                className="text-white border-2 p-2 text-m w-48 h-24 mt-4 mb-4 flex justify-center items-center hover:bg-beer overflow-hidden relative"
                key={el.id}
              >
                {el.name}
                <Plus
                  className="w-6 h-6 absolute top-0 right-0"
                  strokeWidth={1}
                  stroke="currentColor"
                  onClick={(event) => handleAdding(event, el)}
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    ))
  }, [list])

  return (
    <div className="mt-10 text-gray-800">
      <input
        className="ml-4"
        placeholder="Search"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {memoizedList}

      <AddExerciseBar />
    </div>
  )
}
