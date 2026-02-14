'use client'

import { useState, useEffect } from 'react'
import TodoList from '@/components/TodoList'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mb-2">
            我的任务
          </h1>
          <p className="text-gray-600 text-lg">让我们一起完成今天的目标 📋</p>
        </div>
        <TodoList />
      </div>
    </main>
  )
}
