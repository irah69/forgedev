export default function ContactPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="flex flex-col max-w-md">
        <label className="mb-2">Name</label>
        <input className="mb-4 p-2 border" type="text" name="name" />
        <label className="mb-2">Email</label>
        <input className="mb-4 p-2 border" type="email" name="email" />
        <label className="mb-2">Message</label>
        <textarea className="mb-4 p-2 border" name="message" />
        <button className="bg-blue-600 text-white py-2 px-4 rounded" type="submit">Send</button>
      </form>
    </main>
  );
}