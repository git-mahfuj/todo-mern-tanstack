"use client";
import { createTodoApi } from "@/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todo } from "node:test";
import React, { useState } from "react";

const createtodo = async (newTodo : {name : string}) => {
  const res = await createTodoApi(newTodo);
  if (res.status !== 200) throw new Error("Something went wrong");
  return res.data;
};

const TodoInput = () => {
  const [todoName, setTodoName] = useState<string>("");
  const queryClient = useQueryClient();
  const createTodoQuery = useMutation({
    mutationFn: createtodo,
    mutationKey : ["createTodo"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTodoName("");
    },
  });
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!todoName.trim()) return;
    mutate({name : todoName});
  };
  const { mutate, isPending, isError, error } = createTodoQuery;
  return (
    <div className="">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex items-center gap-3"
      >
        <input
          className="bg-white rounded-md py-2.5 w-150 outline-0 font-bold placeholder:text-black text-black px-3"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <button
          type="submit"
          disabled={isPending}
          className="py-2.5 bg-violet-600 px-3 rounded-md font-medium "
        >
          {isPending ? "Creating..." : "Add Task"}
        </button>
        {isError && <p style={{ color: "red" }}>{error.message}</p>}
      </form>
    </div>
  );
};

export default TodoInput;
