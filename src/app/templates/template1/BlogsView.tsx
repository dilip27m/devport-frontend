"use client";
import React, { useState, useMemo } from "react";
import type { Blog } from "@/app/(main)/editor/components/forms/BlogsForm";
import { BookOpen, ArrowRight } from "lucide-react";

interface BlogsViewProps {
  blogs: Blog[];
  limit?: number;
}

const getReadTime = (description: string) => {
  const wordCount = description?.split(/\s+/).length || 0;
  const minRead = Math.max(1, Math.ceil(wordCount / 200));
  return `${minRead} min read`;
};

const BlogsView: React.FC<BlogsViewProps> = ({ blogs, limit }) => {
  const isLatestSection = !!limit;
  const baseBlogs = limit ? blogs.slice(0, limit) : blogs;

  const [search, setSearch] = useState("");

  // Filter blogs only on full blog page (not latest section)
  const displayBlogs = useMemo(() => {
    if (!baseBlogs) return [];
    if (isLatestSection) return baseBlogs;

    const query = search.trim().toLowerCase();
    if (!query) return baseBlogs;

    return baseBlogs.filter((blog) => {
      const name = blog.name?.toLowerCase() || "";
      const category = blog.category?.toLowerCase() || "";
      const desc = blog.description?.toLowerCase() || "";
      return (
        name.includes(query) ||
        category.includes(query) ||
        desc.includes(query)
      );
    });
  }, [baseBlogs, isLatestSection, search]);

  if (!baseBlogs || baseBlogs.length === 0) {
    if (isLatestSection) return null;
    return (
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-5xl font-bold text-white mb-8">Blog</h2>
        <p className="text-gray-400">No blog posts have been added yet.</p>
      </section>
    );
  }

  if (!isLatestSection) {
    const noResults = displayBlogs.length === 0;

    return (
      <section className="max-w-5xl mx-auto py-8 sm:py-12 px-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-3 sm:mb-4">
          Blog
        </h1>
        <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl">
          This is where I share my writings on programming, tutorials, and my
          experiences.
        </p>

        <div className="relative mb-6 sm:mb-10">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b-2 border-gray-800 text-white text-base sm:text-lg p-3 sm:p-4 pr-10 sm:pr-12 focus:outline-none focus:border-green-400 transition-colors placeholder-gray-600"
          />
          <svg
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.75 15.75L20 20M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
            />
          </svg>
        </div>

        {noResults ? (
          <p className="text-gray-500 text-sm">
            No blog posts match{" "}
            <span className="text-gray-300 font-medium">"{search}"</span>.
          </p>
        ) : (
          <div className="space-y-6 sm:space-y-10">
            {displayBlogs.map((blog, index) => (
              <a
                key={index}
                href={blog.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <article className="flex flex-col gap-3 sm:gap-4 py-4 sm:py-6 border-b border-gray-800 hover:border-gray-700 transition-colors">

                  <div className="flex flex-col gap-2">

                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                      {blog.category && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-gray-700 bg-gray-900 text-gray-200 text-[11px]">
                          {blog.category}
                        </span>
                      )}
                      {blog.description && (
                        <span className="text-gray-500">
                          {getReadTime(blog.description)}
                        </span>
                      )}
                    </div>


                    <h3 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                      {blog.name || "Untitled Blog Post"}
                    </h3>

                    <p className="text-gray-400 leading-relaxed text-sm md:text-base break-words">
                      {blog.description || "No description available."}
                    </p>
                  </div>
                </article>
              </a>
            ))}
          </div>
        )}
      </section>
    );
  }


  return (
    <section className="py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen size={20} className="text-white" />
          Latest Article.
        </h2>
        <button
          onClick={() => {
            const event = new CustomEvent("navigate-to-blogs");
            window.dispatchEvent(event);
          }}
          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm font-medium cursor-pointer"
        >
          View all articles <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displayBlogs.map((blog, index) => (
          <a
            href={blog.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="block bg-[#0d1117] border border-gray-800 rounded-xl p-6 group hover:border-gray-700 hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
              {blog.name || "Untitled Blog Post"}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-2">
              {blog.category && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-gray-700 bg-gray-900 text-gray-200 text-[11px]">
                  {blog.category}
                </span>
              )}
              {blog.description && (
                <span className="text-gray-500">
                  {getReadTime(blog.description)}
                </span>
              )}
            </div>


            {blog.description && (
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed break-words mt-1 line-clamp-3">
                {blog.description}
              </p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogsView;