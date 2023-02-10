import { useLocalStorage } from "usehooks-ts";
import { Disclosure } from "@headlessui/react"
import DeleteIcon from "@/components/icons/DeleteIcon"

export default function Profile() {
    const [value, setValue] = useLocalStorage("finishedExercises", [])

    function handleDelete(id) {
        setValue(prev => [...prev].filter(el => el.id !== id))
    }

    return (
        <div className="flex flex-col mt-2">
            <h1 className="text-3xl mb-8">Profile</h1>
            {value.map((el) => {
                const date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(el.date)
                return (
                    <div className="border-2 mb-4 relative" key={el.id}>
                        <Disclosure>
                            <Disclosure.Button as={"div"} key={el.id} className="cursor-pointer">
                                <h1 className="mt-2 ml-2">{date}</h1>
                                <button onClick={() => handleDelete(el.id)}><DeleteIcon className="stroke-white w-6 h-6 absolute top-2 right-2" /></button>
                            </Disclosure.Button>
                            {el.currentTraining.map((exercises) =>
                            (
                                < Disclosure.Panel key={exercises.id} className="flex flex-col">
                                    <p>{exercises.name}</p>
                                    <p>{exercises.type}</p>
                                    <p>{exercises.weight} kg</p>
                                    <p>{exercises.reps} reps</p>
                                </ Disclosure.Panel>
                            )
                            )}
                        </Disclosure>
                    </div>)
            })}



        </div>
    )
}