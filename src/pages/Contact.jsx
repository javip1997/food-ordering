export default function Contact() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070')",
      }}
    >
  
      <div className=" bg-opacity-95 p-8 rounded-lg shadow-xl max-w-3xl w-full mx-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Contact Us
        </h1>

        <div className="grid gap-4 text-gray-700">
          <p>Email: <a href="mailto:support@foodieapp.com" className="text-blue-600 hover:underline">support@foodieapp.com</a></p>
          <p>Phone: <a href="tel:+919999999999" className="text-blue-600 hover:underline">+91-99999 99999</a></p>
          <p>Showroom / Outlets:</p>
          <ul className="list-disc list-inside">
            <li>FoodieApp Downtown – 123 Main Street, Mumbai</li>
            <li>FoodieApp Central – 456 Park Avenue, Delhi</li>
            <li>FoodieApp West End – 789 Market Road, Bangalore</li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Visit Us</h2>
          <iframe
            title="FoodieApp Locations"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31566.42142438911!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670a0!2sBangalore!5e0!3m2!1sen!2sin!4v1696949812345!5m2!1sen!2sin"
            className="w-full h-64 rounded"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
