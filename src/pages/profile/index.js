import useLocalStorage from '@/hooks/useLocalStorage'
import { Disclosure } from '@headlessui/react'
import DeleteIcon from '@/components/icons/DeleteIcon'
import { v4 as uuid } from 'uuid'

export default function Profile() {
  const [finishedTrainings, setFinishedTrainings] = useLocalStorage(
    'finishedTraining',
    [],
  )

  function handleDelete(id) {
    setFinishedTrainings((prev) => [...prev].filter((el) => el.id !== id))
  }

  // TODO: RENDER SOOQA
  return (
    <div className="flex flex-col mt-2">
      <h1 className="text-3xl mb-8">Profile</h1>
      {finishedTrainings.map((el) => {
        const date = new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'full',
        }).format(el.date)
        return (
          <div className="border-2 mb-4 relative" key={uuid()}>
            <Disclosure>
              <Disclosure.Button
                as={'div'}
                key={el.id}
                className="cursor-pointer"
              >
                <h1 className="mt-2 ml-2">{date}</h1>
                <button onClick={() => handleDelete(el.id)}>
                  <DeleteIcon className="stroke-white w-6 h-6 absolute top-2 right-2" />
                </button>
              </Disclosure.Button>
              {el.trainings.map((exercises) => (
                <Disclosure.Panel key={uuid()} className="flex flex-col">
                  <div>{exercises.name}</div>
                  <div>{exercises.type}</div>
                  <div>
                    {exercises.finished.map((p) => (
                      <div className="flex justify-around mx-auto">
                        <span>{p.reps} reps</span>
                        <span>{p.weight} kg</span>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              ))}
            </Disclosure>
          </div>
        )
      })}
    </div>
  )
}
