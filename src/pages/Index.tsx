import { Sparkles, ArrowRight, Star, Trophy, Users, Calendar, MessageCircle, Play, ArrowDown, Award, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import lostImg from "@/assets/lost.png";
import boxImg from "@/assets/box.png";
import laptopGirl from "@/assets/laptop-girl.png";
import thinker from "@/assets/thinker.png";

const stats = [
  { v: "40+", l: "entreprises" },
  { v: "45+", l: "formations" },
  { v: "12+", l: "mentors" },
  { v: "3+", l: "années d'existence" },
];

const leaders = [
  { rank: 1, name: "Camille D.", role: "Frontend Lead", pts: 5240, color: "bg-[hsl(var(--yellow))]" },
  { rank: 2, name: "Yanis M.", role: "DevOps", pts: 4890, color: "bg-[hsl(var(--pink))] text-white" },
  { rank: 3, name: "Sarah B.", role: "Product Designer", pts: 4310, color: "bg-[hsl(var(--blue))] text-white" },
];

const ranking = [
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

const avatars = ["🧑‍💻","👩‍💻","🧑🏽‍💻","👨🏿‍💻","👩🏻‍💻","🧑🏻‍💻","👨🏽‍💻","👩🏿‍💻","🧑‍🚀","👩‍🚀"];

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur bg-background/70 border-b-2 border-foreground/10">
        <nav className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2 font-extrabold text-lg">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-[hsl(var(--yellow))] border-2 border-foreground">✦</span>
            <span>Les Pros <span className="text-[hsl(var(--pink))]">de la</span> Tech</span>
          </a>
          <ul className="hidden md:flex items-center gap-8 font-medium">
            <li><a href="#accueil" className="hover:text-[hsl(var(--pink))]">Accueil</a></li>
            <li><a href="#chiffres" className="hover:text-[hsl(var(--pink))]">Chiffres</a></li>
            <li><a href="#classement" className="hover:text-[hsl(var(--pink))]">Classement</a></li>
          </ul>
          <a href="#partenaire" className="btn-pop bg-[hsl(var(--blue))] text-white">Rejoignez-nous</a>
        </nav>
      </header>

      {/* HERO */}
      <section id="accueil" className="relative bg-grid">
        <div className="container mx-auto pt-16 pb-24 text-center">
          <div className="flex justify-center gap-3 flex-wrap mb-10">
            <span className="pill"><Sparkles className="w-4 h-4 text-[hsl(var(--pink))]" /> Plus de 1k membres déjà actifs</span>
            <span className="pill bg-[hsl(var(--yellow))]">200+ Passionnés</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            <span className="inline-flex items-center gap-4 flex-wrap justify-center">
              La
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[hsl(var(--pink))] text-white border-2 border-foreground">
                <Star className="w-8 h-8 fill-current" /> Tech
              </span>
              <img src={laptopGirl} alt="" className="hidden md:inline-block w-40 h-auto" width={160} height={107} />
            </span>
            <br />
            <span className="inline-flex items-center gap-4 flex-wrap justify-center mt-2">
              Passion
              <img src={thinker} alt="" className="hidden md:inline-block w-32 h-auto" width={128} height={85} />
              <span className="px-4 py-1 rounded-full bg-[hsl(var(--blue))] text-white border-2 border-foreground">La Tech</span>
            </span>
          </h1>

          <div className="mt-12 flex justify-center flex-wrap gap-6 items-center">
            <div className="card-pop p-4 w-64 text-left">
              <div className="text-xs font-bold text-[hsl(var(--pink))] mb-1">LES PROS DE LA TECH</div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex -space-x-2">
                  {avatars.slice(0,3).map((a,i)=>(
                    <span key={i} className="w-7 h-7 rounded-full bg-[hsl(var(--yellow))] border-2 border-foreground grid place-items-center text-xs">{a}</span>
                  ))}
                </div>
                <span>Découvre des contenus de qualité</span>
              </div>
            </div>

            <div className="card-pop bg-[hsl(var(--yellow))] p-4 w-56 text-left rotate-[-3deg]">
              <div className="text-xs font-extrabold mb-1">TECH</div>
              <div className="text-2xl font-extrabold">Quiz 🎯</div>
              <div className="text-sm mt-1">Teste tes skills</div>
            </div>

            <button aria-label="Lecture vidéo" className="w-14 h-14 rounded-full border-2 border-foreground bg-background grid place-items-center hover:bg-[hsl(var(--blue))] hover:text-white transition">
              <Play className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* PERDUS */}
      <section className="bg-background border-y-2 border-foreground">
        <div className="container mx-auto py-24">
          <h2 className="text-center text-3xl md:text-5xl mb-16">
            Vous êtes <span className="text-[hsl(var(--blue))]">perdus</span> ? <span className="inline-block">😵‍💫</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <img src={lostImg} alt="Personne perdue dans la tech" className="w-full max-w-sm mx-auto" loading="lazy" width={400} height={400} />
            <div>
              <h3 className="text-3xl md:text-4xl mb-4">Vous ne savez pas par où <span className="text-[hsl(var(--pink))]">commencer</span> ?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Rejoignez une communauté de passionnés qui partagent leurs connaissances et vous guident dans votre parcours tech.
              </p>
            </div>
            <div className="md:order-3">
              <h3 className="text-3xl md:text-4xl mb-4">Passionnés tech mais <span className="text-[hsl(var(--pink))]">confus</span> ?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Découvrez des ressources, des événements et un réseau de professionnels pour éclaircir vos doutes et accélérer votre croissance.
              </p>
            </div>
            <img src={boxImg} alt="Sortir du cadre" className="w-full max-w-sm mx-auto md:order-4" loading="lazy" width={400} height={400} />
          </div>
        </div>
      </section>

      {/* CTA / STATS */}
      <section id="chiffres" className="bg-grid">
        <div className="container mx-auto py-24 text-center">
          <ArrowDown className="w-8 h-8 mx-auto mb-6 animate-bounce" />
          <p className="text-muted-foreground mb-2">Bah alors</p>
          <h2 className="text-6xl md:text-8xl underline-wavy mb-16">Rejoignez-nous</h2>

          <p className="text-muted-foreground">Vous doutez toujours ?</p>
          <h3 className="text-2xl md:text-4xl mb-10">Pourquoi ne pas voir nos <span className="text-[hsl(var(--pink))]">chiffres</span> ?</h3>

          <div className="card-pop bg-background grid grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto">
            {stats.map((s,i)=>(
              <div key={i} className={`p-8 ${i<stats.length-1 ? 'md:border-r-2 border-foreground/10':''} ${i<2 ? 'border-b-2 md:border-b-0 border-foreground/10':''}`}>
                <div className="text-4xl md:text-5xl font-extrabold">{s.v}</div>
                <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y-2 border-foreground bg-[hsl(var(--blue))] py-6 overflow-hidden">
        <div className="flex marquee gap-12 whitespace-nowrap text-white font-extrabold text-2xl">
          {Array.from({length:2}).map((_,k)=>(
            <div key={k} className="flex gap-12 shrink-0">
              {["Communauté","✦","Mentorat","✦","Événements","✦","Networking","✦","Ressources","✦","Carrière","✦"].map((t,i)=>(
                <span key={i}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-background">
        <div className="container mx-auto py-24">
          <h2 className="text-center text-3xl md:text-5xl mb-16">
            C'est sûr que tu seras ébloui par <br/>ces <span className="text-[hsl(var(--pink))] underline-wavy">témoignages</span>.
          </h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
            <div className="card-pop p-8">
              <MessageCircle className="w-8 h-8 text-[hsl(var(--pink))] mb-4" />
              <p className="text-lg leading-relaxed">
                "Suite à une période un peu compliquée pour moi, j'ai découvert Les Pros de la Tech.
                J'ai pu rejoindre une communauté bienveillante, apprendre régulièrement, et surtout
                j'ai pris confiance en mes compétences. Aujourd'hui, je suis épanoui et j'aide à mon
                tour les nouveaux membres."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--yellow))] border-2 border-foreground grid place-items-center">🧑‍💻</div>
                <div>
                  <div className="font-bold">Mehdi K.</div>
                  <div className="text-xs text-muted-foreground">Développeur Fullstack</div>
                </div>
              </div>
            </div>

            <div className="relative h-80">
              {avatars.map((a,i)=>{
                const positions = [
                  "top-0 left-1/3","top-4 right-4","top-20 left-4","top-24 right-1/4",
                  "top-32 left-1/2","top-44 right-8","top-48 left-12","top-56 right-1/3",
                  "bottom-4 left-1/3","bottom-0 right-12"
                ];
                const colors = ["bg-[hsl(var(--yellow))]","bg-[hsl(var(--pink))]","bg-[hsl(var(--blue))]","bg-background"];
                return (
                  <div key={i} className={`absolute ${positions[i]} w-16 h-16 rounded-full border-2 border-foreground grid place-items-center text-2xl ${colors[i%4]} float-slow`} style={{animationDelay: `${i*0.3}s`}}>
                    {a}
                  </div>
                );
              })}
              <div className="absolute bottom-12 right-0 w-16 h-16 rounded-full border-2 border-foreground bg-foreground text-background grid place-items-center font-extrabold">+95</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROS EN LUMIÈRE */}
      <section className="bg-grid">
        <div className="container mx-auto py-24">
          <h2 className="text-center text-3xl md:text-5xl mb-2">Les <span className="text-[hsl(var(--pink))]">Pros</span> en Lumière</h2>
          <p className="text-center text-muted-foreground mb-12">Rejoignez ces étoiles montantes de la communauté LPT</p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {tag:"Pro du Mois", color:"bg-[hsl(var(--yellow))]", name:"AKINAYO Sokhna", role:"Frontend Dev", pts:537, avatar:"👩🏾‍💻"},
              {tag:"Premier de la classe", color:"bg-[hsl(var(--blue))] text-white", name:"YEMVE Fournier-Edi", role:"Backend Dev", pts:480, avatar:"🧑🏽‍💻"},
            ].map((p,i)=>(
              <div key={i} className="card-pop p-6 text-center">
                <span className={`pill ${p.color} mb-4`}>{p.tag}</span>
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-foreground bg-muted grid place-items-center text-3xl my-4">{p.avatar}</div>
                <div className="font-extrabold text-lg">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.role}</div>
                <div className="mt-4 inline-flex items-center gap-1 text-[hsl(var(--pink))] font-bold">
                  <Star className="w-4 h-4 fill-current" /> {p.pts} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSEMENT */}
      <section id="classement" className="bg-background border-y-2 border-foreground">
        <div className="container mx-auto py-24">
          <h2 className="text-center text-3xl md:text-5xl mb-2">Le Classement <span className="text-[hsl(var(--blue))]">LPT</span> 🏆</h2>
          <p className="text-center text-muted-foreground mb-12">Qui domine la communauté ce mois-ci ?</p>

          <div className="flex justify-center items-end gap-4 mb-12 flex-wrap">
            {leaders.map((l)=>(
              <div key={l.rank} className={`card-pop p-5 text-center w-44 ${l.rank===1 ? 'md:-translate-y-4' : ''}`}>
                <div className={`pill mb-3 ${l.color}`}>#{l.rank} {l.rank===1 && '👑'}</div>
                <div className="w-14 h-14 mx-auto rounded-full border-2 border-foreground bg-[hsl(var(--yellow))] grid place-items-center text-2xl">{avatars[l.rank-1]}</div>
                <div className="font-extrabold mt-3">{l.name}</div>
                <div className="text-xs text-muted-foreground">{l.role}</div>
                <div className="mt-2 font-bold text-[hsl(var(--pink))]">{l.pts} pts</div>
              </div>
            ))}
          </div>

          <div className="card-pop bg-background max-w-3xl mx-auto divide-y-2 divide-foreground/10">
            {ranking.map(([n,r,p],i)=>(
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/50">
                <div className="w-8 text-center font-extrabold text-muted-foreground">#{i+4}</div>
                <div className="w-10 h-10 rounded-full border-2 border-foreground bg-[hsl(var(--yellow))] grid place-items-center">{avatars[(i+3)%avatars.length]}</div>
                <div className="flex-1">
                  <div className="font-bold">{n}</div>
                  <div className="text-xs text-muted-foreground">{r}</div>
                </div>
                <div className="font-bold text-[hsl(var(--blue))]">{p as number} pts</div>
                <Award className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="btn-pop bg-[hsl(var(--blue))] text-white">Voir le classement complet <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </section>

      {/* PARTENAIRE */}
      <section id="partenaire" className="bg-grid">
        <div className="container mx-auto py-24 max-w-2xl">
          <div className="card-pop p-8 md:p-12 bg-background">
            <h2 className="text-center text-3xl md:text-4xl mb-2">Devenir <span className="text-[hsl(var(--pink))]">Partenaire</span></h2>
            <p className="text-center text-muted-foreground mb-8">Rejoignez les entreprises qui font confiance à la communauté LPT.</p>

            <form className="grid sm:grid-cols-2 gap-4">
              <label className="block sm:col-span-1">
                <span className="text-sm font-semibold">Nom de l'entreprise</span>
                <input className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none" placeholder="LPT Corp" />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-semibold">Pays</span>
                <input className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none" placeholder="🇫🇷 France" />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-semibold">Email professionnel</span>
                <input type="email" className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none" placeholder="contact@entreprise.com" />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-semibold">Téléphone</span>
                <input className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none" placeholder="+33 ..." />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold">Site web</span>
                <input className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none" placeholder="https://" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold">Votre message</span>
                <textarea rows={4} className="mt-1 w-full rounded-xl border-2 border-foreground/20 px-4 py-2.5 focus:border-[hsl(var(--blue))] outline-none" placeholder="Parlez-nous de votre projet…" />
              </label>
              <button type="button" className="btn-pop bg-[hsl(var(--blue))] text-white sm:col-span-2 w-full">
                Devenir partenaire <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* JOIN ADVENTURE */}
      <section className="bg-background">
        <div className="container mx-auto py-24 text-center">
          <p className="text-muted-foreground">Bah alors</p>
          <h2 className="text-3xl md:text-5xl mb-10">Tu peux rejoindre la <span className="text-[hsl(var(--pink))]">tech</span> Aventure</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-3xl mx-auto">
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} className="aspect-square card-pop bg-background grid place-items-center text-3xl hover:bg-[hsl(var(--yellow))] transition">
                {["💻","🚀","🎯","🤝","🎓","✨"][i]}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-foreground bg-background">
        <div className="container mx-auto py-10 text-center">
          <div className="flex justify-center gap-4 mb-4">
            {[Github, Twitter, Linkedin, Instagram].map((I,i)=>(
              <a key={i} href="#" aria-label="social" className="w-10 h-10 rounded-full border-2 border-foreground grid place-items-center hover:bg-[hsl(var(--yellow))] transition">
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
};

export default Index;
