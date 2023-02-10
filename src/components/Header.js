import Link from "next/link"
import { useState } from "react"
import NavBarIcon from "./icons/NavBarIcon"
import cn from "classnames"
import CloseIcon from "./icons/CloseIcon"

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)

    function toggleNavBar() {
        setIsOpen(prev => !prev)
    }
    return (
        <>
            <NavBarIcon className="w-10 h-10 mt-8 mr-8 fixed right-0 top-0 z-10 cursor-pointer" onClick={() => toggleNavBar()} />
            <div className={cn("flex flex-col h-screen justify-around border-x-2 p-6 bg-beer fixed right-0 top-0 z-10", { "-right-full": !isOpen })}>
                <CloseIcon onClick={() => toggleNavBar()} className={cn("w-10 h-10 stroke-white fixed top-0 right-0 mt-8 mr-8 cursor-pointer", { "-right-full": !isOpen })} />
                <Link href="/">
                    <p onClick={() => toggleNavBar()} className="font-semibold text-3xl p-4 hover:bg-gray-700 hover:scale-105 hover:rounded-lg"> Home </p>
                </Link>
                <Link href="/allExersises">
                    <p onClick={() => toggleNavBar()} className="font-semibold text-3xl p-4 hover:bg-gray-700 hover:scale-105 hover:rounded-lg"> All exercises</p>
                </Link>
                {/* <Link href="/calculator">
                    <p onClick={() => toggleNavBar()} className="font-semibold text-3xl p-4 hover:bg-gray-700 hover:scale-105 hover:rounded-lg">Traing calculator</p>
                </Link> */}
                <Link href="/profile">
                    <p onClick={() => toggleNavBar()} className="font-semibold text-3xl p-4 hover:bg-gray-700 hover:scale-105 hover:rounded-lg">My trainings</p>
                </Link>
            </div>
        </>
    )
}