"use client";

import React, { useState } from "react";

// --- CHANGE: Added a prop to receive the user's email ---
interface ContactViewProps {
  userEmail?: string;
}

const ContactView: React.FC<ContactViewProps> = ({ userEmail }) => {
  const [formData, setFormData] = useState({
    senderEmail: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // "idle", "sending", "success", "error"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // --- In a real application, your API call would go here ---
    // Note: You would send `formData.senderEmail`, `formData.message`,
    // and `userEmail` (the portfolio owner's email) to your backend.
    console.log("Sending to:", userEmail);
    console.log("Form Data:", formData);
    
    setTimeout(() => { // Simulate API call
      setStatus("success");
      setFormData({ senderEmail: "", message: "" });
      
      setTimeout(() => setStatus("idle"), 3000); // Reset after 3 seconds
    }, 1500);
  };

  // --- START: REDESIGNED JSX to match the new style ---
  return (
    <section className="p-6 md:p-12 text-center">
      <div className="max-w-2xl mx-auto bg-[#161b22] border border-gray-800 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-left">Contact Me</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field with Placeholder */}
          <input
            type="email"
            name="senderEmail"
            value={formData.senderEmail}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full bg-[#0d1117] border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          
          {/* Message Field with Placeholder */}
          <textarea
            name="message"
            rows={7}
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            required
            className="w-full bg-[#0d1117] border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            {status === "sending" && "Sending..."}
            {status === "success" && "Message Sent!"}
            {status === "idle" && "Send"}
          </button>
        </form>
      </div>
    </section>
  );
  // --- END: REDESIGNED JSX ---
};

export default ContactView;