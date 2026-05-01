import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
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
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const partners = await prisma.partnerRegistration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(partners);
  } catch (error) {
    console.error("[partenaires][GET]", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
