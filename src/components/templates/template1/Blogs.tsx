interface Blog {
  title: string;
  desc: string;
  link?: string;
}

interface BlogsProps {
  blogs: Blog[];
}

export default function Blogs({ blogs }: BlogsProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Blogs</h2>
      <div className="space-y-3">
        {blogs.map((blog, idx) => (
          <div key={idx} className="border p-3 rounded-lg hover:shadow-md transition">
            <h3 className="font-bold text-lg">{blog.title}</h3>
            <p className="text-gray-700">{blog.desc}</p>
            {blog.link && <a href={blog.link} target="_blank" className="text-blue-600 underline">Read More</a>}
          </div>
        ))}
      </div>
    </section>
  );
}
