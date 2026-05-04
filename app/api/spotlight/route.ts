import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDatabaseUrl, isDatabaseUnreachableError } from "@/lib/database-url";

export const dynamic = "force-dynamic";

const memberSelect = {
  id: true,
  name: true,
  avatarUrl: true,
  avatarInitials: true,
  lptKikos: true,
  lptLevel: true,
} as const;

type MemberSpotlight = {
  id: string;
  name: string;
  avatarUrl: string | null;
  avatarInitials: string | null;
  lptKikos: number;
  lptLevel: number;
};

async function memberById(userId: string): Promise<MemberSpotlight | null> {
  return prisma.member.findFirst({
    where: { id: userId, lptArchived: false },
    select: memberSelect,
  });
}

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

    const rollingStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

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

    const weeklyCalendarAgg = await prisma.userChallenge.groupBy({
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

    const weeklyRollingAgg = await prisma.userChallenge.groupBy({
      by: ["userId"],
      where: {
        validatedAt: { gte: rollingStart, lte: now },
        status: "VALIDATED",
        user: { lptArchived: false },
      },
      _sum: { pointsAwarded: true },
      orderBy: { _sum: { pointsAwarded: "desc" } },
      take: 1,
    });

    const proOfMonth = monthlyAgg[0] ? await memberById(monthlyAgg[0].userId) : null;
    const proOfMonthKikos = monthlyAgg[0]?._sum.pointsAwarded ?? 0;

    const calendarWeekLabel = `${weekStart.toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" })} - ${new Date(weekEnd.getTime() - 1).toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" })}`;

    let proOfWeek: MemberSpotlight | null = null;
    let proOfWeekKikos = 0;
    let weekLabel = calendarWeekLabel;
    let weekCaption: string | null = null;

    if (weeklyCalendarAgg[0]) {
      proOfWeek = await memberById(weeklyCalendarAgg[0].userId);
      proOfWeekKikos = weeklyCalendarAgg[0]._sum.pointsAwarded ?? 0;
    }
    if (!proOfWeek && weeklyRollingAgg[0]) {
      proOfWeek = await memberById(weeklyRollingAgg[0].userId);
      if (proOfWeek) {
        proOfWeekKikos = weeklyRollingAgg[0]._sum.pointsAwarded ?? 0;
        weekLabel = `${rollingStart.toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" })} – ${now.toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" })}`;
        weekCaption = "Points sur 7 jours glissants (aucune validation sur la semaine civile)";
      }
    }
    if (!proOfWeek) {
      const topOverall = await prisma.member.findFirst({
        where: { lptArchived: false },
        orderBy: { lptKikos: "desc" },
        select: memberSelect,
      });
      if (topOverall) {
        proOfWeek = topOverall;
        proOfWeekKikos = topOverall.lptKikos;
        weekCaption = "Leader du classement (aucune validation récente enregistrée)";
      }
    }

    return NextResponse.json({
      proOfMonth,
      proOfMonthKikos,
      proOfWeek,
      proOfWeekKikos,
      monthLabel: monthStart.toLocaleString("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" }),
      weekLabel,
      weekCaption,
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
