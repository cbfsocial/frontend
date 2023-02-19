import { useMemo } from 'react'
import data from '../data/data.json'
import { v4 as uuidv4 } from 'uuid'

export default function CalculatorSector({ onSubmit, form, setForm }) {
  const exerciseMuscle = useMemo(
    () => Array.from(new Set(data.map((el) => el.muscle))),
    [form.muscleType],
  )
  const exercises = useMemo(
    () => data.filter((el) => el.muscle === form.muscleType),
    [form.muscleType],
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }
  return (
    <div className="text-gray-800 flex flex-col">
      <form onSubmit={handleSubmit}>
        <select
          className="mb-3 w-3/4"
          value={form.muscleType}
          name="Muscle"
          onChange={(e) => setForm({ muscleType: e.target.value })}
        >
          {exerciseMuscle.map((el) => (
            <option key={uuidv4()} value={el}>
              {el}
            </option>
          ))}
        </select>
        <select
          className="mb-3 w-3/4"
          value={form.exerciseName}
          name="Exercises"
          onChange={(e) => setForm({ exerciseName: e.target.value })}
        >
          {exercises.map((el) => (
            <option key={uuidv4()} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>
        <input
          className="mb-3 w-3/4"
          placeholder={'Please enter reps'}
          value={form.reps}
          onChange={(e) => setForm({ reps: parseInt(e.target.value) })}
          type="number"
          min={1}
        />

        <input
          className="mb-3 w-3/4"
          placeholder={'Please enter weight'}
          value={form.weight}
          onChange={(e) => setForm({ weight: parseInt(e.target.value) })}
          type="number"
          min={1}
        />

        <button className="border-2 text-white rounded-full p-4 block">
          Add more
        </button>
      </form>
    </div>
  )
}
