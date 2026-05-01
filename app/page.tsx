"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Github,
  Instagram,
  Linkedin,
  Play,
  Sparkles,
  Star,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";
import { ChallengerAvatar } from "@/components/ChallengerAvatar";
import { TestimonialChallengersSection } from "@/components/TestimonialChallengersSection";

// Mêmes fichiers que l’ancien Vite (src/assets/*.png) — servis depuis public/landing
const lostImg = "/landing/lost.png";
const boxImg = "/landing/box.png";
const laptopGirl = "/landing/laptop-girl.png";
const thinker = "/landing/thinker.png";

type LeaderboardMember = {
  id: string;
  name: string;
  avatarUrl?: string | null;
  avatarInitials?: string | null;
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
  country: string;
  email: string;
  phone: string;
  website: string;
  message: string;
};

const stats = [
  { v: "40+", l: "entreprises" },
  { v: "45+", l: "formations" },
  { v: "12+", l: "mentors" },
  { v: "3+", l: "années d'existence" },
];

const defaultPodium = [
  {
    rank: 1,
    name: "Camille D.",
    role: "Frontend Lead",
    pts: 5240,
    color: "bg-[hsl(var(--yellow))]",
  },
  {
    rank: 2,
    name: "Yanis M.",
    role: "DevOps",
    pts: 4890,
    color: "bg-[hsl(var(--pink))] text-white",
  },
  {
    rank: 3,
    name: "Sarah B.",
    role: "Product Designer",
    pts: 4310,
    color: "bg-[hsl(var(--blue))] text-white",
  },
];

const fallbackRanking: [string, string, number][] = [
  ["Lina K.", "Data Scientist", 3980],
  ["Marc T.", "Backend Dev", 3720],
  ["Inès P.", "UX Researcher", 3510],
  ["Hugo R.", "Mobile Dev", 3320],
  ["Nora A.", "ML Engineer", 3140],
  ["Paul V.", "Cloud Architect", 2980],
  ["Léa F.", "QA Engineer", 2810],
  ["Tom B.", "Tech Lead", 2640],
  ["Sofia M.", "Growth", 2510],
  ["Ali D.", "Cybersécurité", 2390],
];

const podiumColors = [
  "bg-[hsl(var(--yellow))]",
  "bg-[hsl(var(--pink))] text-white",
  "bg-[hsl(var(--blue))] text-white",
];

export default function HomePage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardMember[]>([]);
  const [spotlight, setSpotlight] = useState<SpotlightData | null>(null);
  const [form, setForm] = useState<PartnerFormValues>({
    companyName: "",
    contactName: "",
    country: "",
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

  const podium = useMemo(() => {
    if (leaderboard.length >= 3) {
      return leaderboard.slice(0, 3).map((m, i) => ({
        rank: i + 1,
        name: m.name,
        role: `Niveau ${m.lptLevel}`,
        pts: m.lptKikos,
        color: podiumColors[i] ?? "bg-[hsl(var(--yellow))]",
        avatarUrl: m.avatarUrl,
        avatarInitials: m.avatarInitials,
      }));
    }
    return defaultPodium.map((p) => ({
      ...p,
      avatarUrl: null as string | null,
      avatarInitials: null as string | null,
    }));
  }, [leaderboard]);

  const rankingRows = useMemo(() => {
    if (leaderboard.length > 3) {
      return leaderboard.slice(3).map((m, i) => ({
        rank: i + 4,
        name: m.name,
        role: `Niveau ${m.lptLevel}`,
        pts: m.lptKikos,
        avatarUrl: m.avatarUrl,
        avatarInitials: m.avatarInitials,
      }));
    }
    return fallbackRanking.map(([name, role, pts], i) => ({
      rank: i + 4,
      name,
      role,
      pts,
      avatarUrl: null as string | null,
      avatarInitials: null as string | null,
    }));
  }, [leaderboard]);

  const submitPartner = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const messageWithCountry =
      form.country.trim().length > 0
        ? `${form.message}\n\nPays : ${form.country.trim()}`
        : form.message;
    try {
      const res = await fetch("/api/partenaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: form.companyName,
          contactName: form.contactName,
          email: form.email,
          phone: form.phone,
          website: form.website,
          message: messageWithCountry,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error ?? "Une erreur est survenue.");
        return;
      }
      toast.success("Votre demande a été envoyée avec succès !");
      setForm({
        companyName: "",
        contactName: "",
        country: "",
        email: "",
        phone: "",
        website: "",
        message: "",
      });
    } catch {
      toast.error("Erreur de connexion serveur.");
    } finally {
      setSubmitting(false);
    }
  };

  const spotlightCards = useMemo(
    () => [
      {
        tag: "Pro du mois",
        color: "bg-[hsl(var(--yellow))]",
        name: spotlight?.proOfMonth?.name ?? "—",
        role: spotlight?.proOfMonth ? `Niveau ${spotlight.proOfMonth.lptLevel}` : "En attente des données",
        pts: spotlight?.proOfMonthKikos ?? 0,
        label: spotlight?.monthLabel ?? "",
        avatarUrl: spotlight?.proOfMonth?.avatarUrl ?? null,
        avatarInitials: spotlight?.proOfMonth?.avatarInitials ?? null,
      },
      {
        tag: "Premier de la classe",
        color: "bg-[hsl(var(--blue))] text-white",
        name: spotlight?.proOfWeek?.name ?? "—",
        role: spotlight?.proOfWeek ? `Niveau ${spotlight.proOfWeek.lptLevel}` : "En attente des données",
        pts: spotlight?.proOfWeekKikos ?? 0,
        label: spotlight?.weekLabel ?? "",
        avatarUrl: spotlight?.proOfWeek?.avatarUrl ?? null,
        avatarInitials: spotlight?.proOfWeek?.avatarInitials ?? null,
      },
    ],
    [spotlight],
  );

  return (
    <main className="min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-50 backdrop-blur bg-background/70 border-b-2 border-foreground/10">
        <nav className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2 font-extrabold text-lg">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-[hsl(var(--yellow))] border-2 border-foreground">
              ✦
            </span>
            <span>
              Les Pros <span className="text-[hsl(var(--pink))]">de la</span> Tech
            </span>
          </a>
          <ul className="hidden md:flex items-center gap-8 font-medium">
            <li>
              <a href="#accueil" className="hover:text-[hsl(var(--pink))]">
                Accueil
              </a>
            </li>
            <li>
              <a href="#chiffres" className="hover:text-[hsl(var(--pink))]">
                Chiffres
              </a>
            </li>
            <li>
              <a href="#classement" className="hover:text-[hsl(var(--pink))]">
                Classement
              </a>
            </li>
          </ul>
          <a href="#partenaire" className="btn-pop bg-[hsl(var(--blue))] text-white">
            Rejoignez-nous
          </a>
        </nav>
      </header>

      <section id="accueil" className="relative bg-grid">
        <div className="container mx-auto pt-16 pb-24 text-center">
          <div className="flex justify-center gap-3 flex-wrap mb-10">
            <span className="pill">
              <Sparkles className="w-4 h-4 text-[hsl(var(--pink))]" /> Plus de 1k membres déjà actifs
            </span>
            <span className="pill bg-[hsl(var(--yellow))]">200+ Passionnés</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            <span className="inline-flex items-center gap-4 flex-wrap justify-center">
              La
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[hsl(var(--pink))] text-white border-2 border-foreground">
                <Star className="w-8 h-8 fill-current" /> Tech
              </span>
              <img
                src={laptopGirl}
                alt=""
                className="inline-block w-28 sm:w-36 md:w-40 h-auto max-w-[40vw] object-contain"
                width={160}
                height={107}
                decoding="async"
              />
            </span>
            <br />
            <span className="inline-flex items-center gap-4 flex-wrap justify-center mt-2">
              Passion
              <img
                src={thinker}
                alt=""
                className="inline-block w-24 sm:w-28 md:w-32 h-auto max-w-[35vw] object-contain"
                width={128}
                height={85}
                decoding="async"
              />
              <span className="px-4 py-1 rounded-full bg-[hsl(var(--blue))] text-white border-2 border-foreground">
                La Tech
              </span>
            </span>
          </h1>

          <div className="mt-12 flex justify-center flex-wrap gap-6 items-center">
            <div className="card-pop p-4 w-64 text-left">
              <div className="text-xs font-bold text-[hsl(var(--pink))] mb-1">LES PROS DE LA TECH</div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((idx) => {
                    const m = leaderboard[idx];
                    return (
                      <ChallengerAvatar
                        key={m?.id ?? `hero-${idx}`}
                        name={m?.name ?? "LPT"}
                        avatarUrl={m?.avatarUrl}
                        avatarInitials={m?.avatarInitials}
                        className="size-7 ring-2 ring-background"
                        initialsClassName="text-[10px] font-bold"
                      />
                    );
                  })}
                </div>
                <span>Découvre des contenus de qualité</span>
              </div>
            </div>

            <div className="card-pop bg-[hsl(var(--yellow))] p-4 w-56 text-left rotate-[-3deg]">
              <div className="text-xs font-extrabold mb-1">TECH</div>
              <div className="text-2xl font-extrabold">Quiz 🎯</div>
              <div className="text-sm mt-1">Teste tes skills</div>
            </div>

            <button
              type="button"
              aria-label="Lecture vidéo"
              className="w-14 h-14 rounded-full border-2 border-foreground bg-background grid place-items-center hover:bg-[hsl(var(--blue))] hover:text-white transition"
            >
              <Play className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-background border-y-2 border-foreground">
        <div className="container mx-auto py-24">
          <h2 className="text-center text-3xl md:text-5xl mb-16">
            Vous êtes <span className="text-[hsl(var(--blue))]">perdus</span> ? <span className="inline-block">😵‍💫</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <img
              src={lostImg}
              alt="Personne perdue dans la tech"
              className="w-full max-w-sm mx-auto object-contain"
              loading="lazy"
              width={400}
              height={400}
              decoding="async"
            />
            <div>
              <h3 className="text-3xl md:text-4xl mb-4">
                Vous ne savez pas par où <span className="text-[hsl(var(--pink))]">commencer</span> ?
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Rejoignez une communauté de passionnés qui partagent leurs connaissances et vous guident dans votre parcours tech.
              </p>
            </div>
            <div className="md:order-3">
              <h3 className="text-3xl md:text-4xl mb-4">
                Passionnés tech mais <span className="text-[hsl(var(--pink))]">confus</span> ?
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Découvrez des ressources, des événements et un réseau de professionnels pour éclaircir vos doutes et accélérer votre croissance.
              </p>
            </div>
            <img
              src={boxImg}
              alt="Sortir du cadre"
              className="w-full max-w-sm mx-auto md:order-4 scale-x-[-1] object-contain"
              loading="lazy"
              width={400}
              height={400}
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="chiffres" className="bg-grid">
        <div className="container mx-auto py-24 text-center">
          <ArrowDown className="w-8 h-8 mx-auto mb-6 animate-bounce" />
          <p className="text-muted-foreground mb-2">Bah alors</p>
          <h2 className="text-6xl md:text-8xl underline-wavy mb-16">Rejoignez-nous</h2>

          <p className="text-muted-foreground">Vous doutez toujours ?</p>
          <h3 className="text-2xl md:text-4xl mb-10">
            Pourquoi ne pas voir nos <span className="text-[hsl(var(--pink))]">chiffres</span> ?
          </h3>

          <div className="card-pop bg-background grid grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`p-8 ${i < stats.length - 1 ? "md:border-r-2 border-foreground/10" : ""} ${i < 2 ? "border-b-2 md:border-b-0 border-foreground/10" : ""}`}
              >
                <div className="text-4xl md:text-5xl font-extrabold">{s.v}</div>
                <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-foreground bg-[hsl(var(--blue))] py-6 overflow-hidden">
        <div className="flex marquee gap-12 whitespace-nowrap text-white font-extrabold text-2xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {["Communauté", "✦", "Mentorat", "✦", "Événements", "✦", "Networking", "✦", "Ressources", "✦", "Carrière", "✦"].map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <TestimonialChallengersSection />

      <section className="bg-grid">
        <div className="container mx-auto py-24">
          <h2 className="text-center text-3xl md:text-5xl mb-2">
            Les <span className="text-[hsl(var(--pink))]">Pros</span> en Lumière
          </h2>
          <p className="text-center text-muted-foreground mb-12">Rejoignez ces étoiles montantes de la communauté LPT</p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {spotlightCards.map((p, i) => (
              <div key={i} className="card-pop p-6 text-center">
                <span className={`pill ${p.color} mb-4`}>{p.tag}</span>
                <div className="mx-auto my-4 flex justify-center">
                  <ChallengerAvatar
                    name={p.name}
                    avatarUrl={p.avatarUrl}
                    avatarInitials={p.avatarInitials}
                    className="size-20"
                    initialsClassName="text-2xl font-extrabold"
                  />
                </div>
                <div className="font-extrabold text-lg">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.role}</div>
                {p.label ? <div className="text-xs text-muted-foreground mt-1">{p.label}</div> : null}
                <div className="mt-4 inline-flex items-center gap-1 text-[hsl(var(--pink))] font-bold">
                  <Star className="w-4 h-4 fill-current" /> {p.pts} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="classement" className="bg-background border-y-2 border-foreground">
        <div className="container mx-auto py-24">
          <h2 className="text-center text-3xl md:text-5xl mb-2">
            Le Classement <span className="text-[hsl(var(--blue))]">LPT</span> 🏆
          </h2>
          <p className="text-center text-muted-foreground mb-12">Qui domine la communauté ce mois-ci ?</p>

          <div className="flex justify-center items-end gap-4 mb-12 flex-wrap">
            {podium.map((l) => (
              <div key={`${l.rank}-${l.name}`} className={`card-pop p-5 text-center w-44 ${l.rank === 1 ? "md:-translate-y-4" : ""}`}>
                <div className={`pill mb-3 ${l.color}`}>
                  #{l.rank} {l.rank === 1 && "👑"}
                </div>
                <div className="mx-auto flex justify-center">
                  <ChallengerAvatar
                    name={l.name}
                    avatarUrl={l.avatarUrl}
                    avatarInitials={l.avatarInitials}
                    className="size-14"
                    initialsClassName="text-sm font-bold"
                  />
                </div>
                <div className="font-extrabold mt-3">{l.name}</div>
                <div className="text-xs text-muted-foreground">{l.role}</div>
                <div className="mt-2 font-bold text-[hsl(var(--pink))]">{l.pts} pts</div>
              </div>
            ))}
          </div>

          <div className="card-pop bg-background max-w-3xl mx-auto divide-y-2 divide-foreground/10">
            {rankingRows.map((row, i) => (
              <div key={`${row.rank}-${row.name}`} className="flex items-center gap-4 p-4 hover:bg-muted/50">
                <div className="w-8 text-center font-extrabold text-muted-foreground">#{row.rank}</div>
                <ChallengerAvatar
                  name={row.name}
                  avatarUrl={row.avatarUrl}
                  avatarInitials={row.avatarInitials}
                  className="size-10"
                />
                <div className="flex-1">
                  <div className="font-bold">{row.name}</div>
                  <div className="text-xs text-muted-foreground">{row.role}</div>
                </div>
                <div className="font-bold text-[hsl(var(--blue))]">{row.pts} pts</div>
                <Award className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://challenges.lesprosdelatech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pop bg-[hsl(var(--blue))] text-white inline-flex"
            >
              Voir le classement complet <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="partenaire" className="bg-grid">
        <div className="container mx-auto py-24 max-w-2xl">
          <div className="card-pop p-8 md:p-12 bg-background">
            <h2 className="text-center text-3xl md:text-4xl mb-2">
              Devenir <span className="text-[hsl(var(--pink))]">Partenaire</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Rejoignez les entreprises qui font confiance à la communauté LPT.
            </p>

            <form className="grid sm:grid-cols-2 gap-4" onSubmit={submitPartner}>
              <label className="block sm:col-span-1">
                <span className="text-sm font-semibold">Nom de l&apos;entreprise *</span>
                <input
                  className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none"
                  placeholder="LPT Corp"
                  value={form.companyName}
                  onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
                  required
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-semibold">Nom du contact *</span>
                <input
                  className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none"
                  placeholder="Jean Dupont"
                  value={form.contactName}
                  onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))}
                  required
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-semibold">Pays</span>
                <input
                  className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none"
                  placeholder="🇫🇷 France"
                  value={form.country}
                  onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-semibold">Email professionnel *</span>
                <input
                  type="email"
                  className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none"
                  placeholder="contact@entreprise.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-semibold">Téléphone</span>
                <input
                  className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none"
                  placeholder="+33 ..."
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold">Site web</span>
                <input
                  className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none"
                  placeholder="https://"
                  value={form.website}
                  onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold">Votre message *</span>
                <textarea
                  rows={4}
                  className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none"
                  placeholder="Parlez-nous de votre projet…"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  required
                />
              </label>
              <button type="submit" disabled={submitting} className="btn-pop bg-[hsl(var(--blue))] text-white sm:col-span-2 w-full">
                {submitting ? "Envoi..." : "Devenir partenaire"} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container mx-auto py-24 text-center">
          <p className="text-muted-foreground">Bah alors</p>
          <h2 className="text-3xl md:text-5xl mb-10">
            Tu peux rejoindre la <span className="text-[hsl(var(--pink))]">tech</span> Aventure
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-3xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square card-pop bg-background grid place-items-center text-3xl hover:bg-[hsl(var(--yellow))] transition"
              >
                {["💻", "🚀", "🎯", "🤝", "🎓", "✨"][i]}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-foreground bg-background">
        <div className="container mx-auto py-10 text-center">
          <div className="flex justify-center gap-4 mb-4">
            {[Github, Twitter, Linkedin, Instagram].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="w-10 h-10 rounded-full border-2 border-foreground grid place-items-center hover:bg-[hsl(var(--yellow))] transition"
              >
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Codé avec <span className="text-[hsl(var(--pink))]">♥</span> par <span className="font-bold">@LesProsDeLaTech</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
