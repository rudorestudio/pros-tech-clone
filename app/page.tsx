"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ComponentType, type FormEvent, type SVGProps } from "react";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Facebook,
  Linkedin,
  Play,
  Sparkles,
  Star,
  X,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { ChallengerAvatar } from "@/components/ChallengerAvatar";
import { TestimonialChallengersSection } from "@/components/TestimonialChallengersSection";

const navLogoSrc = "/les-pros-de-la-tech.jpg";

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
  email: string;
  phone: string;
  message: string;
};

const HERO_YOUTUBE_EMBED =
  "https://www.youtube.com/embed/-X8XoG0rFNw?autoplay=1&rel=0&modestbranding=1";

function WhatsAppBrandIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramBrandIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const SOCIAL_LINKS: { href: string; label: string; Icon: ComponentType<{ className?: string }> }[] = [
  {
    href: "https://www.facebook.com/p/Les-Pros-de-la-Tech-61561913896151/",
    label: "Facebook — Les Pros de la Tech",
    Icon: Facebook,
  },
  {
    href: "https://www.linkedin.com/company/les-pros-de-la-tech/",
    label: "LinkedIn — Les Pros de la Tech",
    Icon: Linkedin,
  },
  {
    href: "https://www.youtube.com/@LesProsdelaTech",
    label: "YouTube — Les Pros de la Tech",
    Icon: Youtube,
  },
  {
    href: "https://www.whatsapp.com/channel/0029Va923zU9xVJnqNyIJG14",
    label: "WhatsApp — chaîne Les Pros de la Tech",
    Icon: WhatsAppBrandIcon,
  },
  {
    href: "https://t.me/group_devenir_pro",
    label: "Telegram — Les Pros de la Tech",
    Icon: TelegramBrandIcon,
  },
];

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
    color: "bg-sky-700 text-white",
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
  "bg-sky-700 text-white",
  "bg-[hsl(var(--blue))] text-white",
];

export default function HomePage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardMember[]>([]);
  const [spotlight, setSpotlight] = useState<SpotlightData | null>(null);
  const [form, setForm] = useState<PartnerFormValues>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoOpen]);

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
    try {
      const res = await fetch("/api/partenaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: form.companyName,
          contactName: form.contactName,
          email: form.email,
          phone: form.phone,
          website: "",
          message: form.message,
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
        email: "",
        phone: "",
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
        tag: "Pro de la Semaine",
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
          <a
            href="#accueil"
            className="flex items-center shrink-0"
            aria-label="Les Pros de la Tech — Accueil"
          >
            <Image
              src={navLogoSrc}
              alt="Les Pros de la Tech"
              width={280}
              height={76}
              className="h-[40px] sm:h-[50px] w-auto max-w-[min(280px,72vw)] object-contain object-left"
              priority
              sizes="(max-width: 768px) 72vw, 280px"
            />
          </a>
          <ul className="hidden md:flex items-center gap-8 font-medium">
            <li>
              <a href="#accueil" className="hover:text-[hsl(var(--blue))]">
                Accueil
              </a>
            </li>
            <li>
              <a href="#chiffres" className="hover:text-[hsl(var(--blue))]">
                Chiffres
              </a>
            </li>
            <li>
              <a href="#classement" className="hover:text-[hsl(var(--blue))]">
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
              <Sparkles className="w-4 h-4 text-[hsl(var(--blue))]" /> Plus de 1k membres déjà actifs
            </span>
            <span className="pill bg-[hsl(var(--yellow))]">200+ Passionnés</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            <span className="inline-flex items-center gap-4 flex-wrap justify-center">
              La
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[hsl(var(--blue))] text-white border-2 border-foreground">
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
              <div className="text-xs font-bold text-[hsl(var(--blue))] mb-1">LES PROS DE LA TECH</div>
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
              aria-label="Voir la vidéo de présentation Les Pros de la Tech sur YouTube"
              aria-haspopup="dialog"
              className="w-14 h-14 rounded-full border-2 border-foreground bg-background grid place-items-center hover:bg-[hsl(var(--blue))] hover:text-white transition"
              onClick={() => setVideoOpen(true)}
            >
              <Play className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {videoOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/35 backdrop-blur-[3px]"
          role="presentation"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl border-2 border-foreground bg-black shadow-[8px_8px_0_hsl(var(--ink))] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Vidéo YouTube Les Pros de la Tech"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-2 right-2 z-10 w-10 h-10 rounded-full border-2 border-white/80 bg-black/70 text-white grid place-items-center hover:bg-black transition"
              onClick={() => setVideoOpen(false)}
              aria-label="Fermer la vidéo"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                title="Les Pros de la Tech — présentation"
                src={HERO_YOUTUBE_EMBED}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}

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
                Vous ne savez pas par où <span className="text-[hsl(var(--blue))]">commencer</span> ?
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Rejoignez une communauté de passionnés qui partagent leurs connaissances et vous guident dans votre parcours tech.
              </p>
            </div>
            <div className="md:order-3">
              <h3 className="text-3xl md:text-4xl mb-4">
                Passionnés tech mais <span className="text-[hsl(var(--blue))]">confus</span> ?
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
            Pourquoi ne pas voir nos <span className="text-[hsl(var(--blue))]">chiffres</span> ?
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
            Les <span className="text-[hsl(var(--blue))]">Pros</span> en Lumière
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
                <div className="mt-4 inline-flex items-center gap-1 text-[hsl(var(--blue))] font-bold">
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
                <div className="mt-2 font-bold text-[hsl(var(--blue))]">{l.pts} pts</div>
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
              Devenir <span className="text-[hsl(var(--blue))]">Partenaire</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Rejoignez les entreprises qui font confiance à la communauté LPT.
            </p>

            <form className="grid sm:grid-cols-2 gap-4" onSubmit={submitPartner}>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold">Nom de votre organisation *</span>
                <input
                  className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none"
                  placeholder="Nom de votre organisation"
                  value={form.companyName}
                  onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
                  required
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold">Votre nom *</span>
                <input
                  className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none"
                  placeholder="Prénom Nom"
                  value={form.contactName}
                  onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))}
                  required
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-semibold">Email professionnel *</span>
                <input
                  type="email"
                  className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none"
                  placeholder="vous@entreprise.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-semibold">Téléphone</span>
                <input
                  type="tel"
                  className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none"
                  placeholder="+228 …"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
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
            Tu peux rejoindre la <span className="text-[hsl(var(--blue))]">tech</span> Aventure
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
          <div className="flex justify-center flex-wrap gap-4 mb-4">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border-2 border-foreground grid place-items-center hover:bg-[hsl(var(--yellow))] transition text-foreground"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Codé avec <span className="text-[hsl(var(--blue))]">♥</span> par <span className="font-bold">@LesProsDeLaTech</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
