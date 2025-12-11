import React from "react";
import { VideoEntry } from "../lib/schemas";

type ClientCardProps = {
  name: string;
  socialUrl: string;
  avatarUrl?: string;
};

export function ClientCard({ name, socialUrl, avatarUrl }: ClientCardProps) {
  return (
    <a href={socialUrl} target="_blank" rel="noopener noreferrer">
      {avatarUrl ? (
        <img src={avatarUrl} alt={`${name} logo`} />
      ) : (
        <span>{name}</span>
      )}
    </a>
  );
}