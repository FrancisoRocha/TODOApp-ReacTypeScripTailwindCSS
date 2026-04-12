import { createContext, useReducer } from "react"
import type { Dispatch, ReactNode } from "react"
import { initialTodo, todoReducer } from "../reducers/todo-reducers"
import type { TodoActions, TodoState } from "../reducers/todo-reducers"

// Define el valor que tendra el Context
type TodoContextProps = {
    state: TodoState,
    dispatch: Dispatch<TodoActions>
}

// Define que el Provider aceptara Children
// Cualquier componente que sea envuelto tendra el Contexto
type TodoProviderProps = {
    children: ReactNode
}

// Crear el Contexto de los Todos
// El null! - confía en mí, esto no será null
export const TodoContext = createContext<TodoContextProps>(null!)

export const TodoProvider = ({ children }: TodoProviderProps) => {

    // Aqui es donde vive el estado de la App
    // state - tiene los datos actuales de la App
    // dispatch - funcion para enviar las acciones al reducer
    const [state, dispatch] = useReducer(todoReducer, initialTodo)

    return (
        // Expone el state y el dispatch a todos los componentes hijos
        // children - renderiza los componentes que envuelven los Provider
        <TodoContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </TodoContext.Provider>
    )


}
