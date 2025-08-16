"use client";

import React from "react";

export interface Blog {
  title: string;
  link: string;
  description: string;
}

export interface BlogsFormProps {
  blogs: Blog[];
  onChange: (blogs: Blog[]) => void;
}

const BlogsForm: React.FC<BlogsFormProps> = ({ blogs, onChange }) => {
  const addBlog = () => {
    onChange([...blogs, { title: "", link: "", description: "" }]);
  };

  const updateBlog = (index: number, field: keyof Blog, value: string) => {
    const updated = [...blogs];
    updated[index][field] = value;
    onChange(updated);
  };

  const removeBlog = (index: number) => {
    const updated = blogs.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Blogs</h2>
        <button
          type="button"
          onClick={addBlog}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
        >
          + Add Blog
        </button>
      </div>

      {blogs.map((blog, index) => (
        <div
          key={index}
          className="border rounded p-3 space-y-2 bg-white shadow-sm"
        >
          <input
            type="text"
            placeholder="Blog Title"
            value={blog.title}
            onChange={(e) => updateBlog(index, "title", e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Link"
            value={blog.link}
            onChange={(e) => updateBlog(index, "link", e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Description"
            value={blog.description}
            onChange={(e) => updateBlog(index, "description", e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => removeBlog(index)}
            className="text-red-500 hover:text-red-700"
          >
            ✕ Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogsForm;
