import useLocalStorage from '@/hooks/useLocalStorage'
import { v4 as uuid } from 'uuid'
import PlusIcon from './icons/PlusIcon'
import { use, useState } from 'react'
import ArrowDown from './icons/ArrowDown'
import RepsAndWeights from './RepsAndWeights'

export default function AddExerciseBar() {
  const [currentTraining, setCurrentTraining] = useLocalStorage(
    'currentTraining',
    [],
  )

  const [finishedTrainings, setFinishedTrainings] = useLocalStorage(
    'finishedTraining',
    [],
  )
  const [isHide, setIsHide] = useState(true)
  const [isValidated, setIsValidated] = useState(true)
  const regex = /^[1-9]\d*$/g

  function handleAdding(el) {
    setCurrentTraining((prev) =>
      prev.map((ex) => ({
        ...ex,
        finished:
          el.id === ex.id
            ? [...ex.finished, { id: uuid(), reps: 0, weight: 0 }]
            : ex.finished,
      })),
    )
  }
  // TODO: input validation
  function handleSubmit() {
    setFinishedTrainings((prev) => [
      ...prev,
      { id: uuid(), date: Date.now(), trainings: currentTraining },
    ])
    setCurrentTraining([])
  }

  return currentTraining.length ? (
    <div>
      {isHide ? (
        <div className="fixed bottom-0 h-5/6 w-screen bg-beer overflow-y-scroll overflow-x-hidden ">
          <div className="flex flex-col gap-y-10 justify-around mx-2 items-stretch ">
            <ArrowDown
              strokeWidth={1}
              className="w-8 h-8 right-2 absolute top-2 cursor-pointer"
              stroke="currentColor"
              onClick={() => setIsHide((prev) => !prev)}
            />
            {currentTraining?.map((el) => (
              <div className="p-4" key={el.id}>
                <div className="flex flex-col items-center relative mb-4 mt-4">
                  <span className="">{el.name} </span>
                  <span className="">{el.muscle}</span>
                  <div className="flex justify-around mx-auto w-full">
                    <span>Reps</span>
                    <span>Weight</span>
                  </div>
                  <button>
                    <PlusIcon
                      className="w-8 h-8 absolute right-0 top-1"
                      strokeWidth={1}
                      stroke="currentColor"
                      onClick={() => handleAdding(el)}
                    />
                  </button>
                </div>
                {el.finished.map((fin) => (
                  <RepsAndWeights key={fin.id} id={el.id} exercise={fin} />
                ))}
              </div>
            ))}
            <div className="flex justify-center gap-4 mr-auto ml-auto mt-10 mb-6">
              {isValidated ? null : <p>Please fill the reps and weights</p>}
              <button
                className="text-2xl border-2 rounded-lg p-4"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
              <button
                className="text-2xl border-2 rounded-lg p-4"
                onClick={() => setCurrentTraining([])}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bg-beer fixed bottom-0 w-full flex justify-between cursor-pointer flex-col"
          onClick={() => setIsHide((prev) => !prev)}
        >
          <div>
            <div className="text-xs">{currentTraining.at(-1).muscle}</div>
            <div className="text-xl">{currentTraining.at(-1).name}</div>
          </div>
          <div>
            <div>
              total reps:{' '}
              {currentTraining
                .at(-1)
                .finished.reduce((acc, el) => (acc += el.reps), 0)}{' '}
            </div>
            <div>
              last weight: {currentTraining.at(-1).finished.at(-1).weight}{' '}
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null
}
