import data from "../../data/data.json"

export async function getStaticPaths() {
    const paths = data.map((el) => ({
        params: { id: el.id.toString() },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps(context) {
    return {
        props: {
            exercise: data.find(el => el.id === Number(context.params.id))
        },
    }
}


export default function ExercisesId({ exercise }) {
    return (
        <div>
            <h2 className="text-3xl text-white mb-5">{exercise.name}</h2>
            <p className="text-white font-light">{exercise.instructions}</p>
        </div>
    )
}