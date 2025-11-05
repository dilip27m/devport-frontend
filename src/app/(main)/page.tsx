"use client";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-gray-800">
      
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-blue-600 mb-2">DevPort</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Create and deploy your professional portfolio in minutes. Choose a template, customize your content, and go live with one click.
      </p>

      {/* User Journey Section */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Your DevPort Journey</h2>
        <ol className="space-y-4 list-decimal list-inside text-gray-700">
          <li><strong>Sign up / Log in:</strong> Create your account to get started.</li>
          <li><strong>Choose Templates:</strong> Browse and select a professional layout.</li>
          <li><strong>Editor Section:</strong> Add your personal info, projects, and skills.</li>
          <li><strong>Live Preview:</strong> Instantly see your changes applied.</li>
          <li><strong>Save Data:</strong> Securely store your customizations.</li>
          <li><strong>Deploy:</strong> Publish your portfolio with a unique URL.</li>
        </ol>
      </div>

      {/* Call to Action */}
      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
          Learn More
        </button>
      </div>
    </main>
  );
}