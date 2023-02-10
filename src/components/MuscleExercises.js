import data from "../data/data.json" assert {type: 'json'};
import { v4 as uuidv4 } from 'uuid'
import Link from "next/link";
import { useMemo } from "react";

export default function MuscleExercises({ type, className, searchInput }) {
    const filteredData = data.filter(el => el.muscle === type)
    const test = useMemo(() => filteredData.filter(el => el.name.toLowerCase().includes(searchInput)), [filteredData, searchInput])
    return (
        <div>
            {test.map(el => {
                return (
                    <Link href={`allExersises/${el.id}`} key={el.id}>
                        <span className={className} key={el.id}>{el.name}</span>
                    </Link>
                )
            })}
        </div>
    )
}