import React from "react";
import { Client } from "../lib/schemas";
import { ClientCard } from "./ClientCard";

type ClientSectionProps = {
  clients: Client[];
};

export function ClientSection({ clients }: ClientSectionProps) {
  return (
    <section>
      <h1>I’ve worked with:</h1>
      <div>
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            name={client.name}
            socialUrl={client.socialUrl}
            avatarUrl={client.avatarUrl}
          />
        ))}
      </div>
    </section>
  );
}
