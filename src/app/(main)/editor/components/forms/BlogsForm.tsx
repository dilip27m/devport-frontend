"use client";

import React, { useState } from "react";
import { Trash2, Plus, GripVertical, ChevronDown, ChevronUp, X, Image as ImageIcon } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

import { useAlert } from "@/context/AlertContext";

export interface Blog {
  name: string;
  category: string;
  image: string;
  description: string;
  link: string;
}

interface BlogsFormProps {
  blogs: Blog[];
  onChange: (blogs: Blog[]) => void;
}

/* --- Confirm Box Helper --- */
const ConfirmBox: React.FC<{
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-[92%] sm:w-[420px] bg-white rounded-xl p-4 shadow-lg"
      >
        <p className="text-sm text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200 hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-1 rounded-full text-sm bg-red-600 text-white hover:bg-red-700">Delete</button>
        </div>
      </motion.div>
    </div>
  );
};

const BlogsForm: React.FC<BlogsFormProps> = ({ blogs, onChange }) => {
  const { upload } = useCloudinaryUpload();
  const { showAlert } = useAlert();

  const [openIndex, setOpenIndex] = useState<number | null>(blogs.length > 0 ? 0 : null);
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleChange = (index: number, field: keyof Blog, value: string) => {
    const updated = [...blogs];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingIndex(index);
      const url = await upload(file);
      handleChange(index, "image", url);
    } catch (err) {
      console.error(err);
      showAlert("Image upload failed.", "error");
    } finally {
      setUploadingIndex(null);
    }
  };

  const addBlog = () => {
    const newBlog: Blog = { name: "", category: "", image: "", description: "", link: "" };
    onChange([...blogs, newBlog]);
    setOpenIndex(blogs.length);
  };

  const removeBlog = (index: number) => {
    const updated = blogs.filter((_, i) => i !== index);
    onChange(updated);
    if (openIndex === index) setOpenIndex(null);
    else if (openIndex && openIndex > index) setOpenIndex(openIndex - 1);
  };

  const requestDelete = (index: number) => {
    setConfirmIndex(index);
    setShowConfirm(true);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = [...blogs];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onChange(reordered);
  };

  // Styles
  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Blogs</h2>
        <button
          type="button"
          onClick={addBlog}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
          Add Blog
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blogs-droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
              {blogs.map((blog, index) => {
                const isOpen = openIndex === index;
                const isUploading = uploadingIndex === index;

                return (
                  <Draggable key={index} draggableId={`blog-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border rounded-xl bg-white shadow-sm overflow-hidden transition
                          ${snapshot.isDragging ? "ring-2 ring-offset-2 ring-blue-200" : ""}`}
                      >
                        {/* Header */}
                        <div
                          className="flex justify-between items-center px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <span
                              {...provided.dragHandleProps}
                              className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical size={16} />
                            </span>

                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {blog.name || `Untitled Blog ${index + 1}`}
                              </div>
                              {blog.category && (
                                <div className="text-xs text-gray-500 truncate">{blog.category}</div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                requestDelete(index);
                              }}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                            >
                              <Trash2 size={16} />
                            </button>

                            {isOpen ? <ChevronUp size={18} className="text-gray-600" /> : <ChevronDown size={18} className="text-gray-600" />}
                          </div>
                        </div>

                        {/* Body */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              className="p-4 space-y-5 border-t bg-white"
                            >

                              {/* --- Image Upload Section --- */}
                              <div>
                                <span className={labelClass}>Blog Cover Image</span>
                                <div className="group relative">
                                  <input
                                    id={`blog-image-${index}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(index, e)}
                                    className="hidden"
                                  />

                                  <label
                                    htmlFor={`blog-image-${index}`}
                                    className={`relative w-full h-48 rounded-xl overflow-hidden border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-2
                                        ${blog.image ? "border-transparent shadow-sm" : "border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50"}`}
                                  >
                                    {blog.image ? (
                                      <>
                                        <img
                                          src={blog.image}
                                          alt="Blog Cover"
                                          className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-sm">
                                          Change Cover
                                        </div>
                                      </>
                                    ) : (
                                      <div className="text-gray-400 flex flex-col items-center">
                                        {isUploading ? (
                                          <span className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
                                        ) : (
                                          <ImageIcon size={32} className="mb-2 opacity-50" />
                                        )}
                                        <span className="text-sm font-medium">{isUploading ? "Uploading..." : "Upload Cover Image"}</span>
                                      </div>
                                    )}
                                  </label>

                                  {/* Remove Button */}
                                  {blog.image && !isUploading && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation(); // prevents label click
                                        handleChange(index, "image", "");
                                      }}
                                      className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md border border-gray-100 hover:bg-red-50 transition-colors z-10"
                                      title="Remove image"
                                    >
                                      <X size={14} />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* --- Form Fields --- */}
                              <div className="space-y-4">
                                <div>
                                  <label className={labelClass}>Blog Title</label>
                                  <input
                                    type="text"
                                    value={blog.name}
                                    onChange={(e) => handleChange(index, "name", e.target.value)}
                                    placeholder="e.g. Understanding Git Branches"
                                    className={inputClass}
                                  />
                                </div>

                                <div>
                                  <label className={labelClass}>Category</label>
                                  <input
                                    type="text"
                                    value={blog.category}
                                    onChange={(e) => handleChange(index, "category", e.target.value)}
                                    placeholder="e.g. Technology, Design"
                                    className={inputClass}
                                  />
                                </div>

                                <div>
                                  <label className={labelClass}>Description</label>
                                  <textarea
                                    value={blog.description}
                                    onChange={(e) => handleChange(index, "description", e.target.value)}
                                    placeholder="Brief description of your blog post..."
                                    className={inputClass}
                                    rows={3}
                                  />
                                </div>

                                <div>
                                  <label className={labelClass}>Blog URL</label>
                                  <input
                                    type="url"
                                    value={blog.link}
                                    onChange={(e) => handleChange(index, "link", e.target.value)}
                                    placeholder="https://yourblog.com/post-title"
                                    className={inputClass}
                                  />
                                </div>
                              </div>

                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="text-xs text-gray-500">
        Tip: Add a clear <strong> Blog Title </strong>, a short <strong> Description </strong>,
        and the full <strong> Link </strong> to your published post (Medium, Dev.to, Hashnode, LinkedIn, etc.).
      </div>

      {showConfirm && confirmIndex !== null && (
        <ConfirmBox
          message="Are you sure you want to delete this blog?"
          onCancel={() => {
            setShowConfirm(false);
            setConfirmIndex(null);
          }}
          onConfirm={() => {
            removeBlog(confirmIndex);
            setShowConfirm(false);
            setConfirmIndex(null);
          }}
        />
      )}
    </div>
  );
};

export default BlogsForm;