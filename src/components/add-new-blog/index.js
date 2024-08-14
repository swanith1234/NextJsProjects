"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddNewBlogDialog({
  loading,
  setLoading,
  openDialog,
  setOpenDialog,
  formData,
  setFormData,
  handleSave,
  editBlogId,
  setEditBlogId,
}) {
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Add New Blog
        </Button>
      </div>
      <Dialog
        open={openDialog}
        onOpenChange={() => {
          setOpenDialog(false);
          setEditBlogId(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editBlogId == null ? "Add Blog" : "Edit Blog"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Title" className="text-right">
                Title
              </Label>
              <Input
                id="Title"
                placeholder="Enter Title for blog"
                value={formData.title}
                onChange={(event) => {
                  setFormData({ ...formData, title: event.target.value });
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Description" className="text-right">
                Description
              </Label>
              <Input
                id="Description"
                placeholder="Enter description for blog"
                value={formData.description}
                onChange={(event) => {
                  setFormData({ ...formData, description: event.target.value });
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSave}>
              {loading ? "Saving" : "save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
