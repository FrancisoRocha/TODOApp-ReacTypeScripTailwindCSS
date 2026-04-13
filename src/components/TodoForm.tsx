import { useState } from "react"
import type { ChangeEvent, SubmitEvent } from "react"
import { useTodo } from "../hooks/useTodo"

export default function TodoForm() {

    // Estado local para almacenar el valor del nuevo todo que se va a agregar
    const [todo, setTodo] = useState('')
    // Extrae la función dispatch del Contexto de Todo para poder actualizar el estado global del todo
    const { dispatch } = useTodo()

    // Funcion para el ingreso del nuevo todo, actualizando el estado local del componente
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTodo = e.target.value;
        setTodo(newTodo)
    }

    // Funcion para manejar el envío del formulario, agregando el nuevo todo al estado global a través del dispatch
    const handleSubmit = (e : SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (todo.trim() === '') return // Evita agregar un todo vacío

        dispatch({ type: 'add-todo', payload: { text: todo } })

        setTodo('') // Reinicia el estado local del todo después de agregarlo
    }

    return (
        <form
            className="w-full -mt-8"
            onSubmit={handleSubmit}
        >
            <div className="relative flex items-center">
                <span
                    className="absolute left-4 w-6 h-6 rounded-full border border-(--checkbox) aria-hidden:true"
                />
                <label
                    htmlFor="todo"
                    className="hidden"
                >
                    Todo
                </label>
                <input
                    type="text"
                    id='todo'
                    placeholder="Create a new todo…"
                    className="w-full h-16 rounded-sm outline-none pl-14 font-josefin font-medium text-sm
                        bg-(--bg-input) placeholder:text-(--color-placerholder) text-(--color-text)"
                    onChange={handleChange}
                    value={todo}
                />
            </div>
        </form>
    )
}
