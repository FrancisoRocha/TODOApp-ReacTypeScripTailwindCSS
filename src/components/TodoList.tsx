import { useMemo } from "react";
import { useTodo } from "../hooks/useTodo";
import type { Filters } from "../types";
import { DndContext, PointerSensor ,useSensor, useSensors} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import TodoItem from "./TodoItem";

export default function TodoList() {

    // Extrae el estado del Contexto de Todo para acceder a la lista de todos
    const { state,dispatch } = useTodo();

    // Utiliza useMemo para calcular si la lista de todos está vacía, evitando cálculos innecesarios en cada renderizado
    const isEmpty = useMemo(() => state.todo.length === 0, [state.todo]);

    // Utiliza useMemo para calcular la cantidad de todos activos (no completados),
    // Evitando cálculos innecesarios en cada renderizado
    const activeTodosCount = useMemo(() => state.todo.filter((todos) => !todos.completed).length, [state.todo])

    // Función para manejar el cambio de estado de un todo, alternando entre completado y no completado
    const handleToggleComplete = (id: string) => {
        dispatch({ type: 'complete-todo', payload: { id } })
    }

    // Función para manejar la eliminación de un todo, eliminándolo del estado global a través del dispatch
    const handleDeleteTodo = (id: string) => {
        dispatch({ type: 'delete-todo', payload: { id } })
    }

    // Función para manejar la acción de completar todos los todos,
    // Eliminando los todos completados del estado global a través del dispatch
    const handleCompleteAll = () => {
        dispatch({ type: 'clear-completed' })
    }

    // Función para manejar el cambio de filtro, actualizando el filtro en el estado global a través del dispatch
    const handleFilter = (filter: Filters) => {
        dispatch({ type: 'set-filter', payload: { filter: filter } })
    }

    // Utiliza useMemo para calcular la lista de los Todos filtrados
    // segun el filtro seleccionado
    const filterTodos = useMemo(() => {
        if (state.filter === 'active') return state.todo.filter((todos) => !todos.completed)
        if (state.filter === 'completed') return state.todo.filter((todos) => todos.completed)
        return state.todo
    }, [state.todo, state.filter])

    // Función para manejar el evento de finalización del arrastre,
    const handleDragEnd = (event: DragEndEvent) => {

        // Extrae los IDs del elemento arrastrado (active) y del elemento sobre el que se soltó (over)
        const { active, over } = event
        // Si no hay un elemento sobre el que se soltó o
        // si el elemento arrastrado es el mismo que el elemento sobre el que se soltó,
        // no se realiza ninguna acción
        if (!over || active.id == over.id) return

        // Encuentra los índices del elemento arrastrado y del elemento sobre el que se soltó en la lista de todos
        const sourceIndex = state.todo.findIndex((todos) => todos.id === active.id)
        // Encuentra el índice del elemento sobre el que se soltó en la lista de todos
        const destinationIndex = state.todo.findIndex((todos) => todos.id === over.id)

        // Utiliza el dispatch para enviar una acción de reordenamiento de todos,
        // pasando los índices de origen y destino como payload
         dispatch({ type: 'reorder-todo', payload: { sourceIndex, destinationIndex } })

    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8
            }
        })
    )

    return (
        <>
            {isEmpty ? (
                <p className="font-josefin font-normal text-sm text-(--color-filters) text-center mt-12">
                    No todos yet. Start adding some!
                </p>
            ) : (
                <>
                    <section className="shadow-2xl">
                        <DndContext
                            sensors={sensors}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={filterTodos.map(todo => todo.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <ul className="w-full bg-(--bg-input) rounded-sm mt-12">
                                    {filterTodos.map((todos) => (
                                        <TodoItem
                                            key={todos.id}
                                            todos={todos}
                                            onToggleComplete={handleToggleComplete}
                                            onDelete={handleDeleteTodo}
                                        />
                                    ))}
                                </ul>
                            </SortableContext>
                        </DndContext>
                        <footer className="flex items-center justify-between h-16 p-3 rounded-sm bg-(--bg-input)">
                            <p className="font-josefin font-normal text-sm text-(--color-filters) cursor-pointer">
                                    {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
                            </p>
                            <div className="flex items-center gap-3">
                                <button
                                    className={`font-josefin font-bold text-sm cursor-pointer
                                        ${state.filter === 'all' ? 'text-(--filter-active)' : 'text-(--color-filters)'
                                    }`}
                                    onClick={() => handleFilter('all')}
                                >
                                    All
                                </button>
                                <button
                                    className={`font-josefin font-bold text-sm cursor-pointer
                                        ${state.filter === 'active' ? 'text-(--filter-active)' : 'text-(--color-filters)'
                                    }`}
                                    onClick={() => handleFilter('active')}
                                >
                                    Active
                                </button>
                                <button
                                    className={`font-josefin font-bold text-sm cursor-pointer
                                        ${state.filter === 'completed' ? 'text-(--filter-active)' : 'text-(--color-filters)'
                                    }`}
                                    onClick={() => handleFilter('completed')}
                                >
                                    Completed
                                </button>
                            </div>
                            <button
                                className="font-josefin font-normal text-sm text-(--color-filters) cursor-pointer"
                                onClick={handleCompleteAll}
                            >
                                Clear Completed
                            </button>
                        </footer>
                    </section>
                    <p className="font-josefin font-normal text-sm text-(--color-filters) text-center mt-4">
                        Drag and drop to reorder list
                    </p>
                </>
            )}
        </>
    );
}
