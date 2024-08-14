import connectDb from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import Joi from "joi";
const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogId = searchParams.get("id");
    console.log("swanith",getCurrentBlogId);
    if (!getCurrentBlogId) {
      return NextResponse.json({
        sucess: false,
        message: "No blog found with the id",
      });
    }
    const { title, description } = await req.json();
    const { error } = EditBlog.validate({
      title,
      description,
    });
    if (error) {
      return NextResponse.json({
        sucess: false,
        message: error.details[0].message,
      });
    }

    const updateBlog = await Blog.findOneAndUpdate(
      { _id: getCurrentBlogId },
      {
        title,
        description,
      },
      { new: true }
    );
    if (updateBlog) {
      return NextResponse.json({
        success: true,
        message: "blog updated successfully",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "some error in updating the blog",
    });
  }
}
