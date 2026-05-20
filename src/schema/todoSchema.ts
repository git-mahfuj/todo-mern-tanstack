import mongoose from "mongoose";

export interface TodoType {
  id: number;
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
