import { useMemo, useState, useEffect } from "react"
import data from "../../data/data.json"
import Link from "next/link";
import Plus from "@/components/icons/Plus";
import AddExerciseBar from "@/components/AddExerciseBar";
import { useLocalStorage } from "usehooks-ts";

export default function All() {

    const [searchInput, setSearchInput] = useState("")
    const [currentTraining, setCurrentTraining] = useLocalStorage("currentTraining", [])

    useEffect(() => {
        console.log(currentTraining)
    }, [currentTraining])


    function handleAdding(event, exercise) {
        event.preventDefault()
        setCurrentTraining(prev => [...prev, exercise])
    }

    const list = useMemo(() =>
        data
            .filter(el =>
                el.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .reduce((acc, el) => ({
                ...acc,
                [el.muscle]: [
                    ...(acc[el.muscle] ?? []),
                    el
                ]
            }), {}),
        [searchInput]
    )

    const memoizedList = useMemo(() => {
        return Object.entries(list).map(([k, v]) => (
            <div key={k}>
                <h2 className="text-white text-2xl border-b-2">{k}</h2>
                <div className="flex gap-2 flex-wrap">
                    {
                        v.map(el => (
                            <Link href={`allExersises/${el.id}`} key={el.id}>
                                <span className="text-white border-2 p-2 text-m w-48 h-24 mt-4 mb-4 flex justify-center items-center hover:bg-beer overflow-hidden relative" key={el.id}>{el.name}
                                    <Plus className="bg-white w-6 h-6 absolute top-0 right-0" onClick={(event) => handleAdding(event, el)} />
                                </span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        ))
    }, [list])

    return (
        <div className="mt-10 text-gray-800" onChange={(e) => setSearchInput(e.target.value)}>
            <input className="ml-4" placeholder="Search" />
            {memoizedList}

            <AddExerciseBar handleAddingBar={handleAdding} />
        </div>

    )
}