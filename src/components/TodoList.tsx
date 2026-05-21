"use client";
import { deleteTodoApi, getTodoApi, updateTodoApi } from "@/axios/axios";
import {
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useState } from "react";

export interface TodoType {
  _id?: string;
  id: number | string;
  name: string;
}

const getTodos = async () => {
  try {
    const res = await getTodoApi();
    if (res.status !== 200) throw new Error("Something Went Wrong");
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

const updateTodo = async (updatedTodo: { id: string; name: string }) => {
  try {
    const res = await updateTodoApi(updatedTodo);
    if (res.status !== 200) throw new Error("Error while updating Todo");
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

const TodoList = () => {
  const queryClient = useQueryClient();
  const isMutating = useIsMutating({ mutationKey: ["createTodo"] });
  const [updatedName, setUpdatedName] = useState("");
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);


  const getTodoQuery = useQuery<{ data: TodoType[] }>({
    queryKey: ["todos"],
    queryFn: getTodos,
    refetchInterval: 10000,
  });

  const deleteTodoQuery = useMutation({
    mutationFn: (id: string) => deleteTodoApi(id),
    onSuccess: (responseData, id) => {
      queryClient.setQueryData<{ data: TodoType[] }>(
        ["todos"],
        (currentData) => {
          if (!currentData || !currentData.data) return { data: [] };
          return {
            ...currentData,
            data: currentData.data.filter((todo) => (todo._id || todo.id) !== id),
          };
        }
      );
    },
  });

  const updateTodoQuery = useMutation({
    mutationFn: updateTodo,
    mutationKey: ["updatedTodo"],
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setUpdatedName("");
      console.log("updatedTodo", responseData);
      setEditingTodo(null);
    },
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!updatedName.trim() || !editingTodo) return;

    updateTodoQuery.mutate({
      id: (editingTodo._id || editingTodo.id) as string,
      name: updatedName,
    });
  };

  const { data, isLoading, isError, error } = getTodoQuery;

  const todoListArray = data?.data || [];

  return (
    <div className="relative w-180 bg-white flex flex-col items-center mt-5 text-black pb-4 h-150 rounded-md shadow-md">
      {isMutating > 0 && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
          <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-violet-700 font-semibold mt-2">Adding Todo...</p>
        </div>
      )}
      
      {editingTodo && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center pt-20 z-10 transition-all duration-300">
          <div className="mb-2 text-2xl font-medium text-zinc-800">
            Update Todo
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              className="bg-white rounded-md py-2.5 w-130 outline-0 font-bold text-black px-3 border border-gray-300"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Update todo name..."
            />
            <button
              type="submit"
              disabled={updateTodoQuery.isPending}
              className="py-2.5 bg-violet-600 px-3 font-bold rounded-md text-white min-w-27.5"
            >
              {updateTodoQuery.isPending ? "Updating..." : "Update Task"}
            </button>
          </form>
          {updateTodoQuery.isError && (
            <p className="text-red-600 mt-2">{updateTodoQuery.error.message}</p>
          )}
        </div>
      )}

      <p className="text-black font-bold text-3xl mt-5">Todo List</p>

      <div className="flex items-center flex-col gap-2 w-full mt-4">
        {isError ? (
          <div className="text-red-600">
            {error.message || "Something went wrong"}
          </div>
        ) : isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            
            {todoListArray.map((i: TodoType, index: number) => {
              return (
                <div
                  key={i._id || i.id || index}
                  className="flex justify-between px-5 w-full items-center py-1"
                >
                  <div className="flex items-center">
                    <p className="font-medium text-xl">{i.name}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingTodo(i);
                        setUpdatedName(i.name);
                      }}
                      className="px-2 py-1 bg-blue-700 text-white font-medium rounded-md text-sm"
                    >
                      update
                    </button>

                    <button
                      onClick={() =>
                        deleteTodoQuery.mutate((i._id || i.id) as string)
                      }
                      className="px-2 py-1 bg-red-700 text-white font-medium rounded-md text-sm min-w-17.5"
                    >
                      {deleteTodoQuery.isPending &&
                      deleteTodoQuery.variables === (i._id || i.id)
                        ? "deleting.."
                        : "delete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;