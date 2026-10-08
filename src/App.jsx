import { useState, useEffect, useCallback } from 'react'
import { supabase } from './lib/supabase.js'

function App() {
  const [todos, setTodos] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const fetchTodos = useCallback(async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('Could not load your todos. Please try again.')
      return
    }
    setError(null)
    setTodos(data)
  }, [])

  useEffect(() => {
    fetchTodos().then(() => setLoading(false))
  }, [fetchTodos])

  const addTodo = async (e) => {
    e.preventDefault()
    const title = newTitle.trim()
    if (!title) return

    const { data, error } = await supabase
      .from('todos')
      .insert({ title })
      .select()

    if (error) {
      setError('Could not add the todo. Please try again.')
      return
    }
    setError(null)
    setTodos((prev) => [data[0], ...prev])
    setNewTitle('')
  }

  const toggleTodo = async (id, completed) => {
    const { error } = await supabase
      .from('todos')
      .update({ completed: !completed })
      .eq('id', id)

    if (error) {
      setError('Could not update the todo. Please try again.')
      return
    }
    setError(null)
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
    )
  }

  const deleteTodo = async (id) => {
    const { error } = await supabase.from('todos').delete().eq('id', id)

    if (error) {
      setError('Could not delete the todo. Please try again.')
      return
    }
    setError(null)
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const clearCompleted = async () => {
    const completed = todos.filter((t) => t.completed)
    if (completed.length === 0) return

    const { error } = await supabase
      .from('todos')
      .delete()
      .in('id', completed.map((t) => t.id))

    if (error) {
      setError('Could not clear completed todos. Please try again.')
      return
    }
    setError(null)
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const remainingCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.length - remainingCount

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo</h1>
        <p>Stay on top of your tasks</p>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>
      </header>

      <div className="card">
        <form className="add-form" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            maxLength={200}
          />
          <button type="submit">Add</button>
        </form>

        <div className="filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {loading ? (
          <div className="empty-state">
            <p>Loading...</p>
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>
              {filter === 'completed'
                ? 'No completed tasks yet.'
                : filter === 'active'
                  ? 'No active tasks. Nice work!'
                  : 'No todos yet. Add one above to get started.'}
            </p>
          </div>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <div
                  className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  role="checkbox"
                  aria-checked={todo.completed}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleTodo(todo.id, todo.completed)
                    }
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                  {todo.title}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete todo"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <div className="todo-footer">
            <span>
              {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} left
            </span>
            {completedCount > 0 && (
              <button className="clear-btn" onClick={clearCompleted}>
                Clear completed ({completedCount})
              </button>
            )}
          </div>
        )}
      </div>

      {error && <div className="message error">{error}</div>}
    </div>
  )
}

export default App
