import { connectDB } from "@/db/db";
import Todo from "@/schema/todoSchema";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name } = reqBody;
    const existingName = await Todo.findOne({ name });
    if (existingName) {
      return NextResponse.json(
        {
          message: "Todo Already Exists",
        },
        {
          status: 400,
        },
      );
    }
    const createdTodo = await new Todo({
      name: name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
    });

    const todo = await createdTodo.save();
    console.log(todo);

    return NextResponse.json(
      {
        message: "Todo Created Successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
