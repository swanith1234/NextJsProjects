"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import AddNewBlogDialog from "../add-new-blog";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

async function fetchBlogs() {
  try {
    const apires = await fetch("https://next-js-projects-beige.vercel.app/api/get-blog", {
      method: "GET",
      cache: "no-store",
    });
    const res = await apires.json();
    return res.data;
  } catch (err) {
    console.log(err);
    return []; // Return an empty array in case of an error
  }
}

const initialData = {
  title: "",
  description: "",
};

export default function BlogOverview() {
  const [blogList, setBlogList] = useState([]); // State to hold the fetched blog data
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [editBlogId, setEditBlogId] = useState(null);
  const router = useRouter();

  async function handleEdit(blog) {
    setFormData({
      title: blog.title,
      description: blog.description,
    });
    setOpenDialog(true);
    setEditBlogId(blog._id);
    const apires = await fetch(`/api/update-blog?${blog._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
    console.log(blog);
  }
  async function deleteBlog(id) {
    const apires = await fetch(`/api/delete-blog?id=${id}`, {
      method: "DELETE",
    });
    const res = await apires.json();
    if (res?.success) {
      setBlogList((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    }
  }

  useEffect(() => {
    async function getBlogs() {
      const blogs = await fetchBlogs(); // Await the result of fetchBlogs
      setBlogList(blogs); // Update the state with the fetched data
    }
    getBlogs(); // Fetch the blogs when the component mounts
  }, []); // Empty dependency array to run only on mount

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editBlogId) {
        console.log(editBlogId);
        const apires = await fetch(`/api/update-blog?id=${editBlogId}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        const res = await apires.json();
        console.log(res);
      } else {
        const apires = await fetch("/api/add-blog", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        const res = await apires.json();
        console.log(res);
      }
      // Reset the formData after successful save
      setFormData(initialData);
      setOpenDialog(false);
      // Fetch the updated blog list after adding a new blog
      const updatedBlogs = await fetchBlogs();
      setBlogList(updatedBlogs);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex-col flex gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-10">
      <AddNewBlogDialog
        loading={loading}
        setLoading={setLoading}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        formData={formData}
        setFormData={setFormData}
        handleSave={handleSave}
        editBlogId={editBlogId}
        setEditBlogId={setEditBlogId}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList &&
          blogList.length > 0 &&
          blogList.map((item, index) => (
            <Card key={index}>
              <CardContent>
                <CardTitle className="p-5">{item.title}</CardTitle>
                <CardDescription className="p-5">
                  {item.description}
                  <div className="flex justify-center gap-10 mt-6 mb-0 ">
                    <Button onClick={() => handleEdit(item)}>Edit</Button>
                    <Button onClick={() => deleteBlog(item._id)}>Delete</Button>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
