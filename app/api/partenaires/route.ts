import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDatabaseUrl, isDatabaseUnreachableError } from "@/lib/database-url";

export async function POST(req: Request) {
  if (!getDatabaseUrl()) {
    return NextResponse.json({ error: "Configuration serveur: base de données non configurée." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const { companyName, contactName, email, phone, website, message } = body;

    if (!companyName || !contactName || !email || !message) {
      return NextResponse.json(
        { error: "Veuillez remplir les champs obligatoires." },
        { status: 400 },
      );
    }

    const newPartner = await prisma.partnerRegistration.create({
      data: {
        companyName,
        contactName,
        email,
        phone: phone || null,
        website: website || null,
        message,
      },
    });

    return NextResponse.json(newPartner, { status: 201 });
  } catch (error) {
    console.error("[partenaires][POST]", error);
    if (isDatabaseUnreachableError(error)) {
      return NextResponse.json({ error: "Base de données injoignable." }, { status: 503 });
    }
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

export async function GET() {
  if (!getDatabaseUrl()) {
    return NextResponse.json({ error: "Configuration serveur: base de données non configurée." }, { status: 503 });
  }
  try {
    const partners = await prisma.partnerRegistration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(partners);
  } catch (error) {
    console.error("[partenaires][GET]", error);
    if (isDatabaseUnreachableError(error)) {
      return NextResponse.json({ error: "Base de données injoignable." }, { status: 503 });
    }
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
