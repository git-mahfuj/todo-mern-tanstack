import React from "react";

const TodoList = () => {
  return (
    <div className="w-180 bg-white flex flex-col  items-center mt-5 text-black pb-4 h-150">
      <p className="text-black font-bold text-3xl mt-5">Todo List</p>
      <div className="flex items-center flex-col gap-2 w-full">
        <div className="flex justify-between px-5 w-full ">
          <div className="flex items-center">
            <p>1.</p>
            <p>Task-1</p>
          </div>
          <div className="flex items-center gap-1">
            {" "}
            <button className="px-2 py-1 bg-blue-700 text-white font-medium rounded-md">
              update
            </button>
            <button className="px-2 py-1 bg-red-700 text-white font-medium rounded-md">
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
