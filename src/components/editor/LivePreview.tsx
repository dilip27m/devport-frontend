"use client";

import React from "react";

interface LivePreviewProps {
  data: any;
}

const LivePreview: React.FC<LivePreviewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Profile */}
      <div>
        <h2 className="text-xl font-bold">{data.profile.name || "Your Name"}</h2>
        <p className="text-gray-600">{data.profile.bio || "Your bio will appear here."}</p>
        <p className="text-sm text-gray-500">{data.profile.email}</p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold">Skills</h3>
        <ul className="flex flex-wrap gap-2">
          {data.skills.map((skill: string, i: number) => (
            <li key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Projects */}
      <div>
        <h3 className="text-lg font-semibold">Projects</h3>
        <div className="space-y-3">
          {data.projects.map((proj: any, i: number) => (
            <div key={i} className="border p-3 rounded bg-white shadow-sm">
              <p className="font-semibold">{proj.title}</p>
              <p className="text-sm text-gray-600">{proj.description}</p>
              {proj.link && (
                <a href={proj.link} className="text-blue-600 text-sm underline" target="_blank">
                  {proj.link}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-lg font-semibold">Certifications</h3>
        <ul className="space-y-2">
          {data.certifications.map((cert: any, i: number) => (
            <li key={i} className="border p-2 rounded bg-gray-50">
              {cert.name} – <span className="text-sm text-gray-500">{cert.issuer}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Blogs */}
      <div>
        <h3 className="text-lg font-semibold">Blogs</h3>
        {data.blogs.map((blog: any, i: number) => (
          <div key={i} className="border p-3 rounded bg-white shadow-sm">
            <p className="font-semibold">{blog.title}</p>
            <p className="text-sm text-gray-600">{blog.description}</p>
            {blog.link && (
              <a href={blog.link} target="_blank" className="text-blue-600 underline text-sm">
                {blog.link}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Activities */}
      <div>
        <h3 className="text-lg font-semibold">Extra-Curricular & Achievements</h3>
        {data.activities.map((act: any, i: number) => (
          <div key={i} className="border p-3 rounded bg-white shadow-sm">
            <p className="font-semibold">{act.title}</p>
            <p className="text-sm text-gray-600">{act.description}</p>
            <p className="text-xs text-gray-500">{act.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePreview;
