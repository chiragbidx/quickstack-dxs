"use client";

import { useState } from "react";
import type { Todo } from "./page";

type TodoListProps = {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoList({ todos, onAdd, onToggle, onDelete }: TodoListProps) {
  const [newTask, setNewTask] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newTask.trim()) return;
    onAdd(newTask.trim());
    setNewTask("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6 w-full">
        <input
          className="flex-1 px-4 py-2 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          maxLength={100}
        />
        <button
          type="submit"
          className="bg-orange-500 text-white font-medium px-4 py-2 rounded-full transition hover:bg-orange-600"
          disabled={!newTask.trim()}
        >
          Add
        </button>
      </form>
      <ul className="space-y-4">
        {todos.length === 0 ? (
          <li className="text-gray-400 italic">No todos yet.</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-md"
            >
              <label className="flex items-center flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggle(todo.id)}
                  className="mr-3 w-5 h-5 accent-orange-500"
                />
                <span
                  className={`${
                    todo.completed ? "line-through text-gray-400" : ""
                  } text-base`}
                >
                  {todo.text}
                </span>
              </label>
              <button
                onClick={() => onDelete(todo.id)}
                className="ml-4 px-2 py-1 text-sm rounded hover:bg-red-100 text-red-600"
                aria-label="Delete todo"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}