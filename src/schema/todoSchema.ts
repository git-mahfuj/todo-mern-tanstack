import mongoose from "mongoose";

export interface TodoType {
   _id?: string;
    id: number | string;
    name: string;
}

const todoSchema = mongoose.Schema.create(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
