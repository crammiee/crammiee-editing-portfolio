import { fetchClients, fetchVideos, fetchTestimonials } from "@/lib/fetch";

export default async function HomePage() {
  const [clients, videos, testimonials] = await Promise.all([
    fetchClients(),
    fetchVideos(),
    fetchTestimonials(),
  ]);

  return (
    <main className="p-6 space-y-6">
      <section>
        <h1 className="text-2xl font-semibold">Data sanity check</h1>
        <p className="text-sm text-gray-400">Pulled from Strapi at build/runtime.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Clients</h2>
        <pre className="text-xs bg-gray-900 p-4 rounded">{JSON.stringify(clients, null, 2)}</pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Videos</h2>
        <pre className="text-xs bg-gray-900 p-4 rounded">{JSON.stringify(videos, null, 2)}</pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Testimonials</h2>
        <pre className="text-xs bg-gray-900 p-4 rounded">{JSON.stringify(testimonials, null, 2)}</pre>
      </section>
    </main>
  );
}
