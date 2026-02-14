'use client'

import { useState, useEffect } from 'react'
import { Trash2, Plus, Check } from 'lucide-react'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [mounted, setMounted] = useState(false)

  // 从 localStorage 加载数据
  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        setTodos(JSON.parse(saved))
      } catch {
        setTodos([])
      }
    }
    setMounted(true)
  }, [])

  // 保存到 localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, mounted])

  const addTodo = () => {
    if (input.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: input,
        completed: false,
        createdAt: Date.now(),
      }
      setTodos([newTodo, ...todos])
      setInput('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* 输入框 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="添加新任务..."
          className="flex-1 px-4 py-3 rounded-lg border-2 border-primary/30 focus:border-primary focus:outline-none transition-colors text-dark placeholder-gray-400 bg-white shadow-md"
        />
        <button
          onClick={addTodo}
          className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus size={20} />
          添加
        </button>
      </div>

      {/* 统计信息 */}
      {todos.length > 0 && (
        <div className="grid grid-cols-3 gap-3 bg-white rounded-lg p-4 shadow-md">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-gray-600">总数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{stats.active}</div>
            <div className="text-sm text-gray-600">进行中</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
            <div className="text-sm text-gray-600">已完成</div>
          </div>
        </div>
      )}

      {/* 筛选按钮 */}
      {todos.length > 0 && (
        <div className="flex gap-2 justify-center">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-primary'
              }`}
            >
              {f === 'all' ? '全部' : f === 'active' ? '进行中' : '已完成'}
            </button>
          ))}
        </div>
      )}

      {/* 任务列表 */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">
              {todos.length === 0 ? '🎉' : '✨'}
            </div>
            <p className="text-gray-600 text-lg">
              {todos.length === 0
                ? '还没有任务，开始添加一个吧！'
                : '没有匹配的任务'}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-102"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? 'bg-gradient-to-r from-primary to-secondary border-primary'
                    : 'border-primary/30 hover:border-primary'
                }`}
              >
                {todo.completed && <Check size={16} className="text-white" />}
              </button>
              <span
                className={`flex-1 text-base transition-all ${
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-dark'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* 清除已完成按钮 */}
      {stats.completed > 0 && (
        <div className="text-center pt-4">
          <button
            onClick={clearCompleted}
            className="text-sm text-gray-600 hover:text-primary underline transition-colors"
          >
            清除已完成任务({stats.completed})
          </button>
        </div>
      )}
    </div>
  )
}
