import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Todo } from "../types"

type TodoItemProps = {
    todos: Todo,
    onToggleComplete: (id: string) => void,
    onDelete: (id: string) => void
}

export default function TodoItem({ todos, onToggleComplete, onDelete }: TodoItemProps) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todos.id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex items-center gap-4 h-16 px-6 border-b border-(--border-line) cursor-pointer"
        >
            <div className="relative flex items-center justify-center w-6 h-6">
                <input
                    type="checkbox"
                    value={todos.completed ? 'true' : 'false'}
                    checked={todos.completed}
                    onChange={(e) => {
                        e.stopPropagation()
                        onToggleComplete(todos.id)
                    }}
                    className="peer appearance-none w-6 h-6 rounded-full border border-(--checkbox-border) cursor-pointer
                        checked:bg-linear-to-br checked:from-[hsl(192,100%,67%)] checked:to-[hsl(280,87%,65%)]
                        checked:border-none"
                />
                <img
                    src="/images/icon-check.svg"
                    className="absolute inset-0 m-auto hidden peer-checked:block pointer-events-none"
                />
            </div>
            <p className={`font-josefin font-normal text-lg
                ${todos.completed
                    ? 'line-through decoration-1 text-(--color-checked)'
                    : 'text-(--color-text)'
                }`}
            >
                {todos.text}
            </p>
            <button
                className="ml-auto cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete(todos.id)
                } }
            >
                <img
                    src="/images/icon-cross.svg"
                />
            </button>
        </li>
    )

}
