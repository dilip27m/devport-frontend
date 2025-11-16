"use client";

import React, { useState } from "react";
import { Trash2, Plus, GripVertical, ChevronDown, ChevronUp, X } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

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

/**
 * Inline ConfirmBox component (simple & reusable)
 */
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
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded-full text-sm bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const BlogsForm: React.FC<BlogsFormProps> = ({ blogs, onChange }) => {
  const { upload } = useCloudinaryUpload();

  // internal states
  const [openIndex, setOpenIndex] = useState<number | null>(blogs.length > 0 ? 0 : null);
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // track which index is currently uploading (shows loader under image)
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
      alert("Image upload failed.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const addBlog = () => {
    const newBlog: Blog = { name: "", category: "", image: "", description: "", link: "" };
    onChange([...blogs, newBlog]);
    setOpenIndex(blogs.length); // open the new one
  };

  // actual removal function (no confirm here)
  const removeBlog = (index: number) => {
    const updated = blogs.filter((_, i) => i !== index);
    onChange(updated);
    // fix openIndex
    if (openIndex === index) setOpenIndex(null);
    else if (openIndex && openIndex > index) setOpenIndex(openIndex - 1);
  };

  // Called when user clicks the delete icon — will show inline confirm
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

  return (
    <div className="space-y-6">
      {/* header */}
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
                        {/* header */}
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
                              aria-label="Delete blog"
                            >
                              <Trash2 size={16} />
                            </button>

                            {isOpen ? (
                              <ChevronUp size={18} className="text-gray-600" />
                            ) : (
                              <ChevronDown size={18} className="text-gray-600" />
                            )}
                          </div>
                        </div>

                        {/* body */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              className="p-4 space-y-4 border-t bg-white"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* image column */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cover Image
                                  </label>

                                  <input
                                    type="file"
                                    accept="image/*"
                                    id={`blog-image-${index}`}
                                    onChange={(e) => handleImageUpload(index, e)}
                                    className="hidden"
                                  />

                                  {/* preview area */}
                                  {blog.image ? (
                                    <img
                                      src={blog.image}
                                      alt="Blog cover"
                                      className="w-full max-w-xs h-32 object-cover rounded-md border mb-2"
                                    />
                                  ) : (
                                    <div className="w-full max-w-xs h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-xs text-gray-400 mb-2">
                                      No image
                                    </div>
                                  )}

                                  {/* Upload / Remove pills */}
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <label
                                      htmlFor={`blog-image-${index}`}
                                      className={`inline-flex items-center justify-center gap-1
                                        px-4 py-1 text-sm font-medium
                                        bg-white text-gray-700 border border-gray-300
                                        rounded-full cursor-pointer
                                        hover:bg-gray-50 transition shadow-sm
                                        ${isUploading ? "opacity-60 cursor-wait" : ""}`}
                                    >
                                      Upload
                                    </label>

                                    {blog.image && (
                                      <button
                                        type="button"
                                        onClick={() => handleChange(index, "image", "")}
                                        className="inline-flex items-center justify-center gap-1
                                          px-3 py-1 text-sm font-medium text-red-600
                                          bg-white border border-gray-300 rounded-full cursor-pointer
                                          hover:bg-red-50 transition shadow-sm"
                                      >
                                        <X size={14} /> Remove
                                      </button>
                                    )}
                                  </div>

                                  {/* Upload loader or status (D: small loader below image section) */}
                                  <div className="mt-2 min-h-[18px]">
                                    {isUploading && (
                                      <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-gray-500 animate-spin" />
                                        <span>Uploading image...</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* form fields */}
                                <div className="md:col-span-2 space-y-3">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Blog Name</label>
                                    <input
                                      type="text"
                                      value={blog.name}
                                      onChange={(e) => handleChange(index, "name", e.target.value)}
                                      placeholder="e.g. Understanding Git Branches"
                                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                      type="text"
                                      value={blog.category}
                                      onChange={(e) => handleChange(index, "category", e.target.value)}
                                      placeholder="e.g. Technology, Design, Marketing"
                                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                      value={blog.description}
                                      onChange={(e) => handleChange(index, "description", e.target.value)}
                                      placeholder="Brief description of your blog post..."
                                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                                      rows={4}
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Blog Link</label>
                                    <input
                                      type="url"
                                      value={blog.link}
                                      onChange={(e) => handleChange(index, "link", e.target.value)}
                                      placeholder="https://yourblog.com/post-title"
                                      className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="text-right text-xs text-gray-500">Drag handle on the left to reorder</div>
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
  and the full <strong> Link </strong> to your published post (e.g., Medium article, 
  Dev.to post, Hashnode blog, or LinkedIn article). Make sure the link opens 
  directly to your full <strong> Blog </strong>.
</div>



      {/* inline confirmation modal */}
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
