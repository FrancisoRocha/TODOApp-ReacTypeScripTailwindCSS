import { useContext } from "react"
import { TodoContext } from "../context/TodoContext"

// Custom Hook para el Todos
export const useTodo = () => {

    const context = useContext(TodoContext)

    if (!context) {
        throw new Error('useTodo debe de ser utilizado dentro de un TodoProvider');
    }

   return context

}
