import { useEffect } from "react"
import { useTodo } from "../hooks/useTodo"

export default function Header() {

    // Extrae el estado y la función dispatch del Contexto de Todo
    const { state, dispatch } = useTodo()

    // Función para manejar el cambio de tema, alternando entre 'light' y 'dark'
    const handleTheme = () => {
        dispatch({
            type: 'set-theme',
            payload: {
                tema: state.tema === 'light' ? 'dark' : 'light'
            }
        })
        // Elimina la clase del tema actual y agrega la clase del nuevo tema al body
        const newTheme = state.tema === 'light' ? 'dark' : 'light'
        document.body.classList.remove(state.tema === 'light' ? 'light' : 'dark')
        document.body.classList.add(newTheme)
    }

    // useEffect para agregar la clase del tema actual al body cuando el componente se monta
    useEffect(() => {
        document.body.classList.add(state.tema)
    }, [])

    return (
        <>
            <div
                className={`mx-auto w-full h-52 md:h-80 bg-cover bg-no-repeat px-6 md:px-12
                    ${state.tema === 'light'
                        ? 'bg-[url("/images/bg-mobile-light.jpg")] md:bg-[url("/images/bg-desktop-light.jpg")]'
                        : 'bg-[url("/images/bg-mobile-dark.jpg")] md:bg-[url("/images/bg-desktop-dark.jpg")]'}`
                }

            >
                <div className="max-w-2xl mx-auto px-6 md:px-12 flex items-center justify-between h-full">
                    <h1 className="text-3xl text-white font-bold font-josefin uppercase tracking-[0.5em]">
                        Todo
                    </h1>
                    <button
                        onClick={handleTheme}
                        className="cursor-pointer"
                    >
                        <img
                            src={state.tema === 'light' ? '/images/icon-moon.svg' : '/images/icon-sun.svg'}
                        />
                    </button>
                </div>
            </div>
        </>
    )


}
