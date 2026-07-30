import { useState } from "react";

const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 px-6 md:px-20 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-600">Contact Us</h1>
        <p className="mt-4 text-gray-600">
          Have questions about PlacePro? We'd love to hear from you. Reach
          out and our team will get back to you as soon as possible.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Contact Form */}
        {sent ? (
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">
              ✓
            </div>
            <h3 className="text-xl font-bold text-gray-800">Message Sent!</h3>
            <p className="text-gray-500 mt-2">
              Thanks for reaching out. We'll get back to you soon.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 text-blue-600 font-medium hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="bg-white p-6 rounded-lg shadow space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        )}

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Email</h2>
            <p className="text-gray-600 mt-1">dhruvrathore034@gmail.com</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">Phone</h2>
            <p className="text-gray-600 mt-1">+91 83194 56636</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">Office Hours</h2>
            <p className="text-gray-600 mt-1">Mon – Fri, 9:00 AM – 5:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;