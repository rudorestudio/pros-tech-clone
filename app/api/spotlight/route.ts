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
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const monthEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
    const dayOfWeek = now.getUTCDay();
    const daysFromMonday = (dayOfWeek + 6) % 7;
    const weekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysFromMonday));
    const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);

    const allActiveMembers = await prisma.member.findMany({
      where: { lptArchived: false },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        avatarInitials: true,
        lptKikos: true,
        lptLevel: true,
      },
    });

    const monthlyAgg = await prisma.userChallenge.groupBy({
      by: ["userId"],
      where: {
        validatedAt: { gte: monthStart, lt: monthEnd },
        status: "VALIDATED",
        user: { lptArchived: false },
      },
      _sum: { pointsAwarded: true },
      orderBy: { _sum: { pointsAwarded: "desc" } },
      take: 1,
    });

    const weeklyAgg = await prisma.userChallenge.groupBy({
      by: ["userId"],
      where: {
        validatedAt: { gte: weekStart, lt: weekEnd },
        status: "VALIDATED",
        user: { lptArchived: false },
      },
      _sum: { pointsAwarded: true },
      orderBy: { _sum: { pointsAwarded: "desc" } },
      take: 1,
    });

    const proOfMonth = monthlyAgg[0]
      ? allActiveMembers.find((m) => m.id === monthlyAgg[0].userId) ?? null
      : null;
    const proOfWeek = weeklyAgg[0]
      ? allActiveMembers.find((m) => m.id === weeklyAgg[0].userId) ?? null
      : null;

    return NextResponse.json({
      proOfMonth,
      proOfMonthKikos: monthlyAgg[0]?._sum.pointsAwarded ?? 0,
      proOfWeek,
      proOfWeekKikos: weeklyAgg[0]?._sum.pointsAwarded ?? 0,
      monthLabel: monthStart.toLocaleString("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" }),
      weekLabel: `${weekStart.toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" })} - ${new Date(weekEnd.getTime() - 1).toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" })}`,
    });
  } catch (error) {
    console.error("[spotlight]", error);
    if (isDatabaseUnreachableError(error)) {
      return NextResponse.json(
        {
          error:
            "Base de données injoignable (ECONNREFUSED / timeout). Vérifie DATABASE_URL et que PostgreSQL est accessible. Test: GET /api/health/db",
        },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Failed to fetch spotlight" }, { status: 500 });
  }
}
