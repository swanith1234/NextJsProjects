import connectDb from "@/database";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";

export async function DELETE(req) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogId = searchParams.get("id");
    console.log("id", getCurrentBlogId);
    if (!getCurrentBlogId) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }
    const deleteCurrentBlogId = await Blog.findByIdAndDelete(getCurrentBlogId);
    if (deleteCurrentBlogId) {
      return NextResponse.json({
        success: true,
        message: "delete current blog",
      });
    } else {
      console.log("error in deleting the blog");
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      sucess: false,
      message: "error in deleting the data",
    });
  }
}
