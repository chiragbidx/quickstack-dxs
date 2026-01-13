"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TodoList } from "./todo-list";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodosPage() {
  // Simulate session (replace with real session check)
  const [loggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in page if not logged in
    if (!loggedIn) {
      router.replace("/sign-in");
    }
  }, [loggedIn, router]);

  // Simulate stateful todos (replace with persistent storage or backend)
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      text: "Create your first SaaS todo!",
      completed: false,
    },
  ]);

  function handleAdd(text: string) {
    if (!text) return;
    setTodos([{ id: Date.now().toString(), text, completed: false }, ...todos]);
  }

  function handleToggle(id: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  }

  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl mt-16 p-8 bg-white shadow rounded-lg">
        <h1 className="text-3xl font-bold mb-5">Your To Dos</h1>
        <TodoList
          todos={todos}
          onAdd={handleAdd}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}