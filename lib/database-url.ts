/**
 * Normalise DATABASE_URL (guillemets résiduels, espaces).
 * Ne logge jamais l’URL complète (secrets).
 */
export function getDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL?.trim();
  if (!raw) return undefined;
  return raw.replace(/^["']|["']$/g, "");
}

export function maskDatabaseHost(url: string): string {
  try {
    const u = new URL(url.replace(/^postgres(ql)?:\/\//i, "http://"));
    const db = u.pathname.replace(/^\//, "") || "postgres";
    return `postgresql://${u.hostname}:${u.port || "5432"}/${db}`;
  } catch {
    return "(URL invalide)";
  }
}

export function isDatabaseUnreachableError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as Record<string, unknown>;
  const code = e.code;
  if (code === "ECONNREFUSED" || code === "ENOTFOUND" || code === "ETIMEDOUT" || code === "P1001") {
    return true;
  }
  const msg = String(e.message ?? "");
  return (
    msg.includes("ECONNREFUSED") ||
    msg.includes("ENOTFOUND") ||
    msg.includes("ETIMEDOUT") ||
    msg.includes("Can't reach database server") ||
    msg.includes("P1001")
  );
}
