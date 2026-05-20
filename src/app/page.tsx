import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center translate-y-12">
      <h1 className="text-3xl">Todo App with Mern-Tanstack</h1>
      <div className="mt-10">
        <TodoInput />
        <TodoList />
      </div>
    </div>
  );
}
