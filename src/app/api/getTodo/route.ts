import { connectDB } from "@/db/db";
import Todo from "@/schema/todoSchema";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const todos = await Todo.find({});
    console.log(todos);
    return NextResponse.json(
      {
        message: "Todos Fetched Successfully",
        data: todos,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { error: "Server Error" }, { status: 500 }
    );
  }
}
