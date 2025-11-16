"use client";

import React from "react";
import { Blog } from "@/app/(main)/editor/components/forms/BlogsForm";
import { ExternalLink } from "lucide-react";

interface BlogsViewProps {
  blogs: Blog[];
}

// ⭐ Default sample blogs (only for display when list is empty)
const defaultBlogs: Blog[] = [
  {
    name: "How to Learn Git Fast",
    category: "Technical",
    image: "https://picsum.photos/seed/git/600/400",
    description: "A beginner-friendly introduction to Git, commits, branching, and collaboration.",
    link: "#",
  },
  {
    name: "My Journey Into Coding",
    category: "Non-Technical",
    image: "https://picsum.photos/seed/coding/600/400",
    description: "How I started coding, mistakes I made, and how I improved over time.",
    link: "#",
  },
  {
    name: "Top 5 VS Code Extensions",
    category: "Technical",
    image: "https://picsum.photos/seed/vscode/600/400",
    description: "These extensions boosted my productivity and coding speed significantly.",
    link: "#",
  },
];

const BlogsView: React.FC<BlogsViewProps> = ({ blogs }) => {
  // ❗ DO NOT CHANGE your logic
  const displayBlogs = blogs && blogs.length > 0 ? blogs : defaultBlogs;

  return (
    <section className="p-6 lg:p-12 animate-section">
      <h2 className="text-3xl font-extrabold mb-10">Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayBlogs.map((blog, idx) => (
          <article
            key={idx}
            className="
              glass-bg p-6 rounded-xl 
              neon-border shadow-xl
              hover:scale-[1.03] transition-all
            "
          >
            {/* OPTIONAL IMAGE */}
            {blog.image && (
              <img
                src={blog.image}
                alt="Blog Image"
                className="w-full h-44 object-cover rounded-lg mb-4 shadow-md"
              />
            )}

            {/* Title */}
            <h3 className="text-xl font-semibold text-white">
              {blog.name || "Untitled Post"}
            </h3>

            {/* Category */}
            {blog.category && (
              <p className="text-xs text-[#9b5cff] mt-1">{blog.category}</p>
            )}

            {/* Description / Excerpt */}
            <p className="text-slate-300 mt-3 text-sm leading-relaxed line-clamp-3">
              {blog. description || "No preview available."}
            </p>

            {/* Blog Link */}
            {blog.link && (
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 mt-4 text-[#00b3ff]
                  neon-hover
                "
              >
                Read More <ExternalLink size={16} />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogsView;
