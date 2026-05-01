import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDatabaseUrl, isDatabaseUnreachableError, maskDatabaseHost } from "@/lib/database-url";

export const dynamic = "force-dynamic";

/**
 * GET /api/health/db — vérifie la connexion PostgreSQL (sans exposer le mot de passe).
 */
export async function GET() {
  const url = getDatabaseUrl();
  if (!url) {
    return NextResponse.json(
      {
        ok: false,
        error: "DATABASE_URL manquant dans l’environnement (fichier .env à la racine du projet).",
      },
      { status: 503 },
    );
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      ok: true,
      target: maskDatabaseHost(url),
    });
  } catch (err) {
    const unreachable = isDatabaseUnreachableError(err);
    const message = unreachable
      ? "Connexion refusée ou base injoignable. Vérifie que PostgreSQL tourne, que l’URL Neon / hôte:port est correcte, et les pare-feu / VPN."
      : "Erreur base de données.";
    console.error("[health/db]", unreachable ? maskDatabaseHost(url) : "", err);
    return NextResponse.json(
      {
        ok: false,
        error: message,
        target: maskDatabaseHost(url),
        hint: unreachable
          ? "Exemple Neon : URL complète depuis le dashboard, avec ?sslmode=require. En local : postgres doit écouter sur le host:port indiqué."
          : undefined,
      },
      { status: 503 },
    );
  }
}
