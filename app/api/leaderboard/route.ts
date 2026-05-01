import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDatabaseUrl, isDatabaseUnreachableError } from "@/lib/database-url";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!getDatabaseUrl()) {
    return NextResponse.json(
      { error: "Configuration: DATABASE_URL manquant (voir .env.example)." },
      { status: 503 },
    );
  }
  try {
    const [topMembers, totalCount] = await Promise.all([
      prisma.member.findMany({
        where: { lptArchived: false },
        orderBy: { lptKikos: "desc" },
        take: 15,
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          avatarInitials: true,
          lptKikos: true,
          lptLevel: true,
        },
      }),
      prisma.member.count({
        where: { lptArchived: false },
      }),
    ]);

    return NextResponse.json({ topMembers, totalCount });
  } catch (error) {
    console.error("[leaderboard]", error);
    if (isDatabaseUnreachableError(error)) {
      return NextResponse.json(
        {
          error:
            "Base de données injoignable (ECONNREFUSED / timeout). Vérifie DATABASE_URL et que PostgreSQL est accessible. Test: GET /api/health/db",
        },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
