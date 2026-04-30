"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Award, Sparkles, Star } from "lucide-react";

type LeaderboardMember = {
  id: string;
  name: string;
  lptKikos: number;
  lptLevel: number;
};

type SpotlightData = {
  proOfMonth: LeaderboardMember | null;
  proOfMonthKikos: number;
  proOfWeek: LeaderboardMember | null;
  proOfWeekKikos: number;
  monthLabel: string;
  weekLabel: string;
};

type PartnerFormValues = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  message: string;
};

const stats = [
  { v: "40+", l: "entreprises" },
  { v: "45+", l: "formations" },
  { v: "12+", l: "mentors" },
  { v: "3+", l: "annees d'existence" },
];

const fallbackRanking = [
  ["Lina K.", "Data Scientist", 3980],
  ["Marc T.", "Backend Dev", 3720],
  ["Ines P.", "UX Researcher", 3510],
  ["Hugo R.", "Mobile Dev", 3320],
];

const avatars = ["🧑‍💻", "👩‍💻", "🧑🏽‍💻", "👨🏿‍💻", "👩🏻‍💻", "🧑🏻‍💻"];

export default function HomePage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardMember[]>([]);
  const [spotlight, setSpotlight] = useState<SpotlightData | null>(null);
  const [form, setForm] = useState<PartnerFormValues>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setLeaderboard(data.topMembers ?? []))
      .catch(() => setLeaderboard([]));

    fetch("/api/spotlight")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setSpotlight(data))
      .catch(() => setSpotlight(null));
  }, []);

  const submitPartner = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/partenaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setForm({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        website: "",
        message: "",
      });
      window.alert("Demande envoyee avec succes.");
    } catch {
      window.alert("Une erreur est survenue lors de l'envoi.");
    } finally {
      setSubmitting(false);
    }
  };

  const rankingRows =
    leaderboard.length > 3
      ? leaderboard.slice(3).map((m) => [m.name, `Niv. ${m.lptLevel}`, m.lptKikos] as const)
      : fallbackRanking;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-50 backdrop-blur bg-background/70 border-b-2 border-foreground/10">
        <nav className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2 font-extrabold text-lg">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-[hsl(var(--yellow))] border-2 border-foreground">✦</span>
            <span>Les Pros <span className="text-[hsl(var(--pink))]">de la</span> Tech</span>
          </a>
          <a href="#partenaire" className="btn-pop bg-[hsl(var(--blue))] text-white">Rejoignez-nous</a>
        </nav>
      </header>

      <section className="relative bg-grid">
        <div className="container mx-auto pt-16 pb-24 text-center">
          <div className="flex justify-center gap-3 flex-wrap mb-10">
            <span className="pill"><Sparkles className="w-4 h-4 text-[hsl(var(--pink))]" /> Plus de 1k membres deja actifs</span>
            <span className="pill bg-[hsl(var(--yellow))]">200+ Passionnes</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            La Tech Passion
          </h1>
        </div>
      </section>

      <section className="bg-grid" id="chiffres">
        <div className="container mx-auto py-24 text-center">
          <h2 className="text-6xl md:text-8xl underline-wavy mb-16">Rejoignez-nous</h2>
          <div className="card-pop bg-background grid grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className={`p-8 ${i < stats.length - 1 ? "md:border-r-2 border-foreground/10" : ""} ${i < 2 ? "border-b-2 md:border-b-0 border-foreground/10" : ""}`}>
                <div className="text-4xl md:text-5xl font-extrabold">{s.v}</div>
                <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background border-y-2 border-foreground" id="classement">
        <div className="container mx-auto py-24">
          <h2 className="text-center text-3xl md:text-5xl mb-2">Le Classement <span className="text-[hsl(var(--blue))]">LPT</span> 🏆</h2>
          <p className="text-center text-muted-foreground mb-12">Classement synchronise avec l'API.</p>

          <div className="flex justify-center items-end gap-4 mb-12 flex-wrap">
            {(leaderboard.length ? leaderboard.slice(0, 3) : []).map((l, i) => (
              <div key={l.id} className={`card-pop p-5 text-center w-44 ${i === 0 ? "md:-translate-y-4" : ""}`}>
                <div className="pill mb-3">#{i + 1}</div>
                <div className="font-extrabold mt-3">{l.name}</div>
                <div className="mt-2 font-bold text-[hsl(var(--pink))]">{l.lptKikos} pts</div>
              </div>
            ))}
          </div>

          <div className="card-pop bg-background max-w-3xl mx-auto divide-y-2 divide-foreground/10">
            {rankingRows.map(([n, r, p], i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/50">
                <div className="w-8 text-center font-extrabold text-muted-foreground">#{i + 4}</div>
                <div className="w-10 h-10 rounded-full border-2 border-foreground bg-[hsl(var(--yellow))] grid place-items-center">{avatars[i % avatars.length]}</div>
                <div className="flex-1">
                  <div className="font-bold">{n}</div>
                  <div className="text-xs text-muted-foreground">{r}</div>
                </div>
                <div className="font-bold text-[hsl(var(--blue))]">{p} pts</div>
                <Award className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-grid">
        <div className="container mx-auto py-20 text-center">
          <h2 className="text-3xl md:text-5xl mb-4">Les Pros en Lumiere</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="card-pop p-6">
              <span className="pill mb-4 bg-[hsl(var(--yellow))]">Pro du mois</span>
              <div className="font-extrabold text-lg">{spotlight?.proOfMonth?.name ?? "A venir"}</div>
              <div className="mt-2 text-[hsl(var(--pink))] font-bold inline-flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" /> {spotlight?.proOfMonthKikos ?? 0} pts ({spotlight?.monthLabel ?? "mois actuel"})
              </div>
            </div>
            <div className="card-pop p-6">
              <span className="pill mb-4 bg-[hsl(var(--blue))] text-white">Pro de la semaine</span>
              <div className="font-extrabold text-lg">{spotlight?.proOfWeek?.name ?? "A venir"}</div>
              <div className="mt-2 text-[hsl(var(--blue))] font-bold inline-flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" /> {spotlight?.proOfWeekKikos ?? 0} pts ({spotlight?.weekLabel ?? "semaine en cours"})
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="partenaire" className="bg-grid">
        <div className="container mx-auto py-24 max-w-2xl">
          <div className="card-pop p-8 md:p-12 bg-background">
            <h2 className="text-center text-3xl md:text-4xl mb-2">Devenir <span className="text-[hsl(var(--pink))]">Partenaire</span></h2>
            <p className="text-center text-muted-foreground mb-8">Formulaire connecte a `POST /api/partenaires`.</p>
            <form className="grid sm:grid-cols-2 gap-4" onSubmit={submitPartner}>
              <input className="rounded-xl border-2 border-foreground/20 px-4 py-2.5" placeholder="Nom entreprise" value={form.companyName} onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))} required />
              <input className="rounded-xl border-2 border-foreground/20 px-4 py-2.5" placeholder="Nom contact" value={form.contactName} onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))} required />
              <input type="email" className="rounded-xl border-2 border-foreground/20 px-4 py-2.5" placeholder="Email pro" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
              <input className="rounded-xl border-2 border-foreground/20 px-4 py-2.5" placeholder="Telephone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
              <input className="sm:col-span-2 rounded-xl border-2 border-foreground/20 px-4 py-2.5" placeholder="Site web" value={form.website} onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))} />
              <textarea rows={4} className="sm:col-span-2 rounded-xl border-2 border-foreground/20 px-4 py-2.5" placeholder="Votre message" value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} required />
              <button type="submit" disabled={submitting} className="btn-pop bg-[hsl(var(--blue))] text-white sm:col-span-2 w-full">
                {submitting ? "Envoi..." : "Devenir partenaire"} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
