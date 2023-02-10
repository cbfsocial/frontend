import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid"
import DeleteIcon from "./icons/DeleteIcon";

export default function AddExerciseBar({ handleAddingBar }) {

    const [currentTraining, setCurrentTraining] = useLocalStorage("currentTraining", [])

    function handleDelete(exercise) {
        setCurrentTraining(prev => prev.filter(el => el.id !== exercise))
        console.log(currentTraining)
    }

    return currentTraining.length ? (
        <div className="fixed bottom-0 h-5/6 w-screen bg-beer overflow-y-scroll overflow-x-hidden ">
            <div className="flex flex-col gap-y-10 justify-around mx-2 items-stretch ">
                {currentTraining?.map(el => (
                    <div className="flex justify-between gap-10" key={uuid()}>
                        <div className="flex flex-col">
                            <span className="">{el.name} </span>
                            <span className="">{el.muscle}</span>
                        </div>
                        <div className="flex gap-4">
                            <input className="rounded-lg w-2/3" placeholder="reps" />
                            <input className="rounded-lg w-2/3" placeholder="weight" />
                            <button> <DeleteIcon className="w-6 h-6" onClick={() => handleDelete(el.id)} /></button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-4 mr-auto ml-auto mt-10 mb-6">
                <button className="text-2xl border-2 rounded-lg p-4">Submit</button>
                <button className="text-2xl border-2 rounded-lg p-4" onClick={() => setCurrentTraining([])}>Cancel</button>
            </div>
        </div>
    ) : null
}