import connectDb from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Blog from "@/models/blog";
const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connectDb();
    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;
    const { error } = AddNewBlog.validate({
      title,
      description,
    });
    if (error) {
      return NextResponse.json({
        sucess: false,
        message: error.details[0].message,
      });
    }
    const newlyCreatedBlogItem = await Blog.create(extractBlogData);
    if (newlyCreatedBlogItem) {
      return NextResponse.json({
        sucess: true,
        message: "sucessfully posted the blog",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      sucess: false,
      message: "error in posting the data",
    });
  }
}
