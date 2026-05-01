import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [topMembers, totalCount] = await Promise.all([
      prisma.member.findMany({
        where: { lptArchived: false },
        orderBy: { lptKikos: "desc" },
        take: 15,
        select: {
          id: true,
          name: true,
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
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
