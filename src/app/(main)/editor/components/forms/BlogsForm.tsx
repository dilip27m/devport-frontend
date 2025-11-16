"use client";

import React, { useState } from "react";
import { Trash2, Plus, GripVertical, ChevronDown, ChevronUp, X } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

export interface Blog {
  name: string;
  category: string;
  image: string; // stored as Cloudinary URL
  description: string;
  link: string;
}

interface BlogsFormProps {
  blogs: Blog[];
  onChange: (blogs: Blog[]) => void;
}

const categoryOptions = ["Technical", "Non-Technical"];

const BlogsForm: React.FC<BlogsFormProps> = ({ blogs, onChange }) => {
  const { upload } = useCloudinaryUpload();
  const [openIndex, setOpenIndex] = useState<number | null>(blogs.length > 0 ? 0 : null);

  // update a single blog field
  const handleChange = (index: number, field: keyof Blog, value: string) => {
    const updated = [...blogs];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  // upload image to Cloudinary (same approach as ProjectsForm)
  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await upload(file);
      handleChange(index, "image", imageUrl);
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Image upload failed. Please try again.");
    }
  };

  const addBlog = () => {
    const newBlog: Blog = { name: "", category: "", image: "", description: "", link: "" };
    onChange([...blogs, newBlog]);
    setOpenIndex(blogs.length);
  };

  const removeBlog = (index: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    const updated = blogs.filter((_, i) => i !== index);
    onChange(updated);
    if (openIndex === index) setOpenIndex(null);
    else if (openIndex && openIndex > index) setOpenIndex(openIndex - 1);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(blogs);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onChange(reordered);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Blogs</h2>
        <button
          type="button"
          onClick={addBlog}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
          <Plus size={14} /> Add Blog
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blogs-droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
              {blogs.map((blog, index) => {
                const isOpen = openIndex === index;

                return (
                  <Draggable key={index} draggableId={`blog-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`border rounded-xl bg-white shadow-sm overflow-hidden transition ${snapshot.isDragging ? "ring-2 ring-offset-2 ring-blue-200" : ""}`}>
                        {/* Header */}
                        <div
                          className="flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <span {...provided.dragHandleProps} className="text-gray-400 hover:text-gray-600 cursor-grab">
                              <GripVertical size={16} />
                            </span>

                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {blog.name || `Untitled Blog ${index + 1}`}
                              </div>
                              {blog.category && <div className="text-xs text-gray-500 truncate">{blog.category}</div>}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeBlog(index); }}
                              className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition"
                              aria-label={`Remove blog ${index + 1}`}
                            >
                              <Trash2 size={16} />
                            </button>

                            {isOpen ? <ChevronUp size={18} className="text-gray-600" /> : <ChevronDown size={18} className="text-gray-600" />}
                          </div>
                        </div>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="p-4 space-y-4 border-t bg-white"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                <div className="md:col-span-1">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>

                                  <input
                                    type="file"
                                    accept="image/*"
                                    id={`blog-image-${index}`}
                                    onChange={(e) => handleImageUpload(index, e)}
                                    className="hidden"
                                  />

                                  <div className="flex flex-col items-start">
                                    {blog.image ? (
                                      <img src={blog.image} alt={`Blog ${index + 1} cover`} className="w-full max-w-xs rounded-md border shadow-sm mb-3 object-cover h-32" />
                                    ) : (
                                      <div className="w-full max-w-xs h-32 rounded-md border-dashed border-2 border-gray-200 flex items-center justify-center text-xs text-gray-500 mb-3">
                                        No image
                                      </div>
                                    )}

                                    <div className="flex space-x-2 w-full">
                                      <label htmlFor={`blog-image-${index}`} className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm cursor-pointer hover:bg-gray-200">
                                        Upload Image
                                      </label>

                                      {blog.image && (
                                        <button
                                          type="button"
                                          onClick={() => handleChange(index, 'image', '')}
                                          className="inline-flex items-center px-3 py-2 border rounded-md text-sm text-red-600 hover:bg-red-50"
                                          title="Remove image"
                                        >
                                          <X size={14} /> Remove
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="md:col-span-2 space-y-3">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Blog Name</label>
                                    <input
                                      type="text"
                                      value={blog.name}
                                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                                      placeholder="e.g. GIT BRANCHES"
                                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                      value={blog.category}
                                      onChange={(e) => handleChange(index, 'category', e.target.value)}
                                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                      <option value="">Select category</option>
                                      {categoryOptions.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                      ))}
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                      value={blog.description}
                                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                                      placeholder="Write a short summary..."
                                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      rows={4}
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Blog Link</label>
                                    <input
                                      type="url"
                                      value={blog.link}
                                      onChange={(e) => handleChange(index, 'link', e.target.value)}
                                      placeholder="https://yourblog.com/full-post"
                                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end">
                                <div className="text-xs text-gray-500">Drag handle on the left to reorder</div>
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
    </div>
  );
};

export default BlogsForm;
