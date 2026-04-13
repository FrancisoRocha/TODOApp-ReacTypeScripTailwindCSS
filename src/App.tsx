import Header from "./components/Header"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

function App() {

  return (
    <div className="min-h-screen">
        <Header />
        <main className="max-w-2xl mx-auto px-6 md:px-12">
            <TodoForm />
            <TodoList />
        </main>
    </div>
  )

}

export default App
