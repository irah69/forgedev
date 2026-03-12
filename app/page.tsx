export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to FreelanceCo</h1>
      <p className="text-lg mb-8 max-w-2xl">
        We help businesses grow with custom web development, design, and consulting services. Explore our work and get in touch to start your next project!
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <a href="/services" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Our Services</a>
        <a href="/portfolio" className="bg-gray-200 text-gray-900 px-6 py-2 rounded hover:bg-gray-300 transition">View Portfolio</a>
        <a href="/contact" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Contact Us</a>
      </div>
    </section>
  );
}
