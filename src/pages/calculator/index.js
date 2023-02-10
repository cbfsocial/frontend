import { useState, useReducer } from "react"
import CalculatorSector from "@/components/CalculatorSelector"
import data from "../../data/data.json"
import { v4 as uuid } from "uuid"
import { useLocalStorage } from "usehooks-ts";

const initForm = () => ({
    muscleType: data[0].muscle,
    exerciseName: data[0].name,
    reps: 0,
    weight: 0,
})

export default function Calculator() {
    const [finishedExercises, setFinishedExercises] = useLocalStorage("finishedExercises", [])
    const [currentTraining, setCurrentTraining] = useState([])

    function clearForm() {
        setForm(initForm())
    }

    function handleSave() {
        if (currentTraining.length === 0) return
        setCurrentTraining([])
        setFinishedExercises(prev => [...prev, { currentTraining, date: Date.now(), id: uuid() }])
        clearForm()
    }

    function handleSubmitForm({ muscleType, exerciseName, weight, reps }) {
        if (Number(reps) && Number(weight)) {
            setCurrentTraining(prev => [...prev, {
                id: uuid(),
                type: muscleType,
                name: exerciseName,
                weight,
                reps
            }])
            clearForm()
        }
    }

    function handleDelete(id) {
        setCurrentTraining(prev => [...prev].filter((el) => el.id !== id))
    }

    const [form, setForm] = useReducer((state, action) => ({
        ...state,
        ...action
    }), initForm())

    return (
        <div className="mt-10 mx-4">
            <h1 className="text-2xl text-white">Calculator</h1>
            <CalculatorSector form={form} setForm={setForm} onSubmit={handleSubmitForm} />
            <div className="flex flex-col gap-8 mt-4">
                {currentTraining.map(el =>
                    <div
                        key={el.id}
                        className="flex justify-between text-white border-2 border-x- p-4 flex-col">
                        <span className="text-3xl">{el.name} </span>
                        <span className="capitalize text-sm">{el.type} </span>
                        <div className="flex gap-10 text-xl my-4">
                            <span>{el.weight} kg</span>
                            <span>{el.reps} reps</span>
                        </div>
                        <button
                            className="border rounded-xl p-2"
                            onClick={() => handleDelete(el.id)}>Delete</button>
                    </div>
                )}
            </div>
            <button className="border-2 text-white rounded-full p-4 mt-4" onClick={() => handleSave()}> Save Traing</button>

        </div>
    )
}


