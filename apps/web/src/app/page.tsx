import { HeroSection } from "../components/HeroSection";
import { ClientSection } from "@/components/ClientSection";
import { fetchClients } from "@/lib/fetch";

export default async function HomePage() {
  const clients = await fetchClients();

  return (
    <main>
      <HeroSection
        headline="Crafting Stories Through Video"
        subheadline="I help creators and brands transform raw footage into engaging, polished content that connects with audiences."
        ctaLabel="Work With Me"
      />
      <ClientSection clients={clients}/>
    </main>
  );
}
