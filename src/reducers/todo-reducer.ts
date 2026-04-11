import type { Filters, Theme, Todo } from "../types";
import { v4 as uuid } from 'uuid';

// Acciones del todo
export type TodoActions =
        { type: "add-todo"; payload: { text: string } } |
        { type: "update-todo"; payload: { todo: Todo } } |
        { type: "delete-todo"; payload: { id: Todo['id'] } } |
        { type: "complete-todo"; payload: { id: Todo['id'] } } |
        { type: "set-filter"; payload: { filter: Filters } } |
        { type: "set-theme"; payload: { tema: Theme } } |
        { type: 'show-modal' } |
        { type: 'close-modal' } |
        { type: "clear-completed" }

// Estado del todo
export type TodoState = {
        todo: Todo[],
        editingTodo: Todo["id"],
        modal: boolean,
        filter: Filters,
        tema: Theme,
        complete : boolean
};

// Estado inicial del todo
export const initialTodo: TodoState = {
        todo: [],
        editingTodo: "",
        modal: false,
        filter: "all",
        tema: "light",
        complete : false
};

// Reducer para manejar las acciones relacionadas con el Todo,
// actualizando el estado según la acción recibida
export const todoReducer = (
        state: TodoState = initialTodo,
        action: TodoActions,
) => {

    // Agregar TODO
    if (action.type === 'add-todo') {
        return {
            ...state,
            todo: [...state.todo,  {id: uuid(), text: action.payload.text, completed: false } ]
        }
    }

    // Actualizar TODO
    if (action.type === 'update-todo') {
        return {
            ...state,
            todo: state.todo.map((todos) => todos.id === action.payload.todo.id
                ? action.payload.todo
                : todos),
            modal: true,
           editingTodo: ''
        }
    }

    // Eliminar TODO
    if (action.type === 'delete-todo') {
        return {
            ...state,
            todo: state.todo.filter((todos) => todos.id !== action.payload.id)
        }
    }

    // Completar TODO
    if (action.type === 'complete-todo') {
        return {
            ...state,
            todo: [...state.todo.map((todosCompleteds) => todosCompleteds.id === action.payload.id
                ? { ...todosCompleteds, completed: !todosCompleteds.completed }
                : todosCompleteds)]
        }
    }


    // Filtros TODO
    if (action.type === 'set-filter') {
        return {
            ...state,
            filter: action.payload.filter

        }
    }

    // TEMA
    if (action.type === 'set-theme') {
        return {
            ...state,
            tema: action.payload.tema
        }
    }

    // Mostrar Modal
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    // Ocultar Modal
    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false
        }
    }

    // Eliminar los Completados
    if (action.type === 'clear-completed') {
        return {
            ...state,
            todo: state.todo.filter((todos) => !todos.completed)
        }
    }

    return state
};
