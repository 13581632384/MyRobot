import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "TodoList - 任务管理器",
  description: "一个现代化的 TodoList 应用",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-light text-dark">{children}</body>
    </html>
  )
}
