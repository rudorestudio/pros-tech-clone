"use client";

import { useState } from "react";

export type ChallengerAvatarProps = {
  name: string;
  avatarUrl?: string | null;
  avatarInitials?: string | null;
  className?: string;
  initialsClassName?: string;
};

function deriveInitials(name: string, preset?: string | null) {
  const fromPreset = preset?.trim();
  if (fromPreset) return fromPreset.slice(0, 4).toUpperCase();
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase() || "?";
}

export function ChallengerAvatar({
  name,
  avatarUrl,
  avatarInitials,
  className = "size-10",
  initialsClassName = "text-xs font-bold tracking-tight",
}: ChallengerAvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = deriveInitials(name, avatarInitials);
  const url = avatarUrl?.trim();
  const showImg = Boolean(url) && !imgFailed;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-foreground bg-muted ${className}`}
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote challenger photos (many possible hosts)
        <img src={url} alt="" className="size-full object-cover" onError={() => setImgFailed(true)} />
      ) : (
        <span className={`select-none px-0.5 leading-none ${initialsClassName}`}>{initials}</span>
      )}
    </span>
  );
}
