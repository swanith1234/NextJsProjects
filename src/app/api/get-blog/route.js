import connectDb from "@/database";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";

export async function GET() {
  try {
    await connectDb();
    const extractBlog = await Blog.find({});

    if (extractBlog && extractBlog.length > 0) {
      return NextResponse.json(
        {
          success: true,
          data: extractBlog,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "No blogs found",
        },
        { status: 404 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again later",
      },
      { status: 500 }
    );
  }
}
