import { connectDB } from "@/db/db";
import Todo from "@/schema/todoSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  try {
    const { id } = await params;
    const reqBody = await req.json();
    const { name } = reqBody;
    const existingName = await Todo.findById(id as string);

    const newTodo = await Todo.replaceOne(
      { _id: id },
      {
        name: name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      },
    );
    if (!newTodo) {
      return NextResponse.json(
        {
          error: "Failed while updating Todo",
        },
        {
          status: 404,
        },
      );
    }
    console.log(newTodo);

    return NextResponse.json(
      {
        message: "API Hitted",
        data: newTodo,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
