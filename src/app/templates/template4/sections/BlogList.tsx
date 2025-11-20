"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BlogList = ({ blogs }: { blogs: any[] }) => {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section id="blog" className="scroll-mt-24">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
             <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-3">Writing</h2>
             <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Latest Articles</h3>

             <div className="space-y-4">
                {blogs.map((blog, idx) => (
                    <a 
                        key={idx} 
                        href={blog.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                        {blog.category || "Tech"}
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors mb-2">
                                    {blog.name}
                                </h4>
                                <p className="text-slate-600 text-sm line-clamp-2 max-w-2xl">
                                    {blog.description}
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
             </div>
        </motion.div>
    </section>
  );
};

export default BlogList;