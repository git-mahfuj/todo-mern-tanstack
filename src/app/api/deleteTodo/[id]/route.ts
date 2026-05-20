import { connectDB } from "@/db/db";
import Todo from "@/schema/todoSchema";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const deletedProduct = await Todo.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json(
        {
          message: "Error while Deleting Todo",
        },
        {
          status: 400,
        },
      );
    }
    console.log(deletedProduct);
    return NextResponse.json(
      {
        message: "Todo Deleted Successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        error: "server Error",
      },
      {
        status: 500,
      },
    );
  }
}
