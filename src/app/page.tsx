"use client"
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { connectDB } from "@/db/db";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-center items-center translate-y-12">
        <h1 className="text-3xl">Todo App with Mern-Tanstack</h1>
        <div className="mt-10">
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </QueryClientProvider>
  );
}
