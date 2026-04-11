
// Tipos para el estado de la app
export type Todo = {
    id: string,
    text: string,
    completed: boolean,
}

// Tipos para el tema
export type Theme = 'light' | 'dark'

// Tipos para los filtros
export type Filters = 'all' | 'active' | 'completed'
