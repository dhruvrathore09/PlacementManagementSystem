const Contact = () => {
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
        <form className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
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

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Email</h2>
            <p className="text-gray-600 mt-1">support@placepro.com</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">Phone</h2>
            <p className="text-gray-600 mt-1">+91 98765 43210</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">Address</h2>
            <p className="text-gray-600 mt-1">
              Placement Cell, Main Campus, Indore, Madhya Pradesh, India
            </p>
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