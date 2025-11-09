"use client";

import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

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

const categoryOptions = ["Technical", "Non-Technical"];

const BlogsForm: React.FC<BlogsFormProps> = ({ blogs, onChange }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(blogs.length > 0 ? 0 : null);

  const handleChange = (index: number, field: keyof Blog, value: string) => {
    const updated = [...blogs];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleChange(index, "image", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addBlog = () => {
    const newBlog = { name: "", category: "", image: "", description: "", link: "" };
    onChange([...blogs, newBlog]);
    setOpenIndex(blogs.length);
  };

  const removeBlog = (index: number) => {
    const updated = blogs.filter((_, i) => i !== index);
    onChange(updated);
    if (openIndex === index) setOpenIndex(null);
    else if (openIndex && openIndex > index) setOpenIndex(openIndex - 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Blogs</h2>
        <button
          type="button"
          onClick={addBlog}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
        >
          ➕ Add Blog
        </button>
      </div>

      {/* Blog Cards */}
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl bg-white shadow-sm transition-all"
        >
          {/* Header */}
          <div
            className="flex justify-between items-center px-5 py-3 bg-gray-50 rounded-t-xl border-b cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="text-sm font-medium text-gray-800 truncate">
              {blog.name || "Untitled Blog"}{" "}
              {blog.category && (
                <span className="text-xs text-gray-500">({blog.category})</span>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeBlog(index);
              }}
              className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition"
              aria-label="Remove blog"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Body */}
          {openIndex === index && (
            <div className="p-5 space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                  className="block w-full text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {blog.image && (
                  <img
                    src={blog.image}
                    alt="Cover Preview"
                    className="mt-3 w-full max-w-xs rounded-lg border shadow-sm"
                  />
                )}
              </div>

              {/* Blog Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Name
                </label>
                <input
                  type="text"
                  value={blog.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="e.g. GIT BRANCHES"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={blog.category}
                  onChange={(e) => handleChange(index, "category", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={blog.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  placeholder="Write a short summary..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              {/* Blog Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Link
                </label>
                <input
                  type="url"
                  value={blog.link}
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                  placeholder="https://yourblog.com/full-post"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogsForm;
