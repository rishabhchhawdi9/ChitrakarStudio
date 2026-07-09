import { createFileRoute, Link } from "@tanstack/react-router";
import { motion as framerMotion } from "framer-motion";
import { heroImage, type Work } from "../lib/works";
import { STUDIO as staticStudio } from "../lib/studio";
import { useWorks, useAbstracts, useStudio } from "../lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${staticStudio.name} — Hand-Painted Murals & Wall Art, Faridabad` },
      {
        name: "description",
        content: `Studio by ${staticStudio.artist}. Murals, wall art, restaurant interiors, canvas commissions across India.`,
      },
      { property: "og:title", content: `${staticStudio.name} — Mural & Wall Art Studio` },
      {
        property: "og:description",
        content: `Hand-painted murals and wall art by ${staticStudio.artist}, based in ${staticStudio.city}.`,
      },
      { property: "og:image", content: heroImage },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const testimonials = [
  {
    quote: "Tarun turned a blank wall into the heart of our café. Guests photograph it every day.",
    by: "Aarti K.",
    role: "Café owner, Faridabad",
  },
  {
    quote:
      "The mural in our daughter's room is pure magic. Careful, patient, and genuinely talented.",
    by: "Rohit & Meera",
    role: "Private home",
  },
  {
    quote: "Chitrakar delivered on-time and elevated our brand space beyond what we imagined.",
    by: "Studio Nine",
    role: "Retail client",
  },
];

function Index() {
  const works = useWorks();
  const featured = works.filter((w) => w.featured).slice(0, 6);
  return (
    <>
      <Hero />
      {featured.length > 0 && <Featured items={featured} />}
      <AbstractTeaser />
      <Testimonials />
      <CTA />
    </>
  );
}

function Hero() {
  const STUDIO = useStudio();
  return (
    <section className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden grain">
      <div className="mx-auto max-w-6xl text-center relative">
        <framerMotion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm uppercase tracking-[0.4em] text-primary/70 mb-8"
        >
          Mural Artist · Wall Art · Commercial Interiors
        </framerMotion.p>
        <h1 className="font-[family-name:var(--font-display)] text-primary leading-[0.88] text-balance">
          <framerMotion.span
            initial={{ opacity: 0, y: 30, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="block text-6xl sm:text-8xl md:text-[10rem]"
          >
            LET'S PAINT
          </framerMotion.span>
          <framerMotion.span
            initial={{ opacity: 0, y: 30, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="block text-6xl sm:text-8xl md:text-[10rem] mt-2 md:mt-4"
          >
            YOUR WALLS
          </framerMotion.span>
        </h1>
        <framerMotion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 grid md:grid-cols-2 gap-10 max-w-4xl mx-auto text-left"
        >
          <p className="text-base md:text-lg leading-relaxed">
            {STUDIO.name} is a mural &amp; fine-art studio led by <strong>{STUDIO.artist}</strong>.
            From full-wall murals for restaurants and homes to portrait commissions and canvas work
            — painted by hand from our studio in {STUDIO.city}.
          </p>
          <div className="space-y-2 md:text-right font-medium uppercase tracking-wider text-sm md:text-base">
            <p>{STUDIO.instagramHandle}</p>
            <p>{STUDIO.phone}</p>
            <p className="lowercase">{STUDIO.email}</p>
          </div>
        </framerMotion.div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/gallery"
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-medium text-xs uppercase tracking-[0.25em] rounded-full hover:scale-105 transition-transform"
          >
            See the Work
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 border-2 border-primary text-primary font-medium text-xs uppercase tracking-[0.25em] rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Commission a Piece
          </Link>
        </div>
      </div>
    </section>
  );
}

function Featured({ items }: { items: Work[] }) {
  const STUDIO = useStudio();
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-primary/25 pb-6">
          <h2 className="font-[family-name:var(--font-display)] text-primary text-5xl md:text-7xl -rotate-1 leading-none">
            Featured Work
          </h2>
          <Link
            to="/gallery"
            className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-70 underline underline-offset-8 decoration-2"
          >
            View full gallery →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((w, i) => (
            <framerMotion.figure
              key={w.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="tilt-hover"
              style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.4}deg)` }}
            >
              <div className="relative overflow-hidden rounded-lg border-2 border-primary/25 bg-card">
                <img
                  src={w.url}
                  alt={`${w.title} — ${w.category} by ${STUDIO.name}`}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                <span className="font-[family-name:var(--font-display)] text-primary text-lg normal-case tracking-normal">
                  {w.title}
                </span>
                <span className="text-primary/60">{w.category}</span>
              </figcaption>
            </framerMotion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-6 py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.4em] opacity-70 mb-4">Kind Words</p>
        <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl mb-14 -rotate-1 leading-none">
          From clients &amp; collectors
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <framerMotion.blockquote
              key={t.by}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-8 rounded-2xl border-2 border-primary-foreground/30 bg-primary-foreground/5"
              style={{ transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)` }}
            >
              <p className="text-lg leading-relaxed">"{t.quote}"</p>
              <footer className="mt-6 text-xs uppercase tracking-[0.25em] opacity-80">
                — {t.by} · {t.role}
              </footer>
            </framerMotion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 py-28 text-center">
      <h2 className="font-[family-name:var(--font-display)] text-primary text-6xl sm:text-7xl md:text-9xl leading-[0.9] -rotate-1">
        Got a wall?
      </h2>
      <p className="mt-6 max-w-xl mx-auto text-base md:text-lg">
        Restaurants, cafés, homes, brand spaces — let's plan a piece that turns your space into a
        story.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/contact"
          className="px-8 py-3 bg-primary text-primary-foreground rounded-full text-xs uppercase tracking-[0.25em] hover:scale-105 transition-transform"
        >
          Start a project
        </Link>
        <Link
          to="/services"
          className="px-8 py-3 border-2 border-primary text-primary rounded-full text-xs uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          See services
        </Link>
      </div>
    </section>
  );
}

function AbstractTeaser() {
  const ABSTRACT_ARTS = useAbstracts();
  const STUDIO = useStudio();
  const firstArt = ABSTRACT_ARTS[0] || null;
  const secondArt = ABSTRACT_ARTS[1] || firstArt;

  if (!firstArt) return null;

  return (
    <section className="px-6 py-24 bg-card border-y-2 border-primary/10 overflow-hidden relative">
      {/* Dynamic background badge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/2 opacity-40 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text and context */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-primary/70">
              New Exhibition Launch
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-primary text-5xl md:text-7xl -rotate-1 leading-none tracking-tight">
              Abstract Series
            </h2>
            <p className="text-base md:text-lg text-primary/80 leading-relaxed">
              Step away from representative walls and delve into raw, physical materiality. Our
              newly published dedicated space showcases {STUDIO.artist}'s experimental abstract
              paintings — featuring hand-troweled Italian marble dust, custom oxide-pigments,
              soot-ash, and precious metals.
            </p>
            <p className="text-sm text-primary/70">
              Each piece is documented across multiple photographic states, including direct studio
              lights, physical gesso textures, and actual living-space installations.
            </p>
            <div className="pt-4">
              <Link
                to="/abstract"
                className="inline-flex items-center gap-3 px-8 py-3 bg-primary text-primary-foreground font-medium text-xs uppercase tracking-[0.25em] rounded-full hover:scale-105 transition-transform cursor-pointer"
              >
                Explore Abstract Space
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Visual Overlay Pile */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[400px] md:min-h-[450px]">
            {/* Background overlapping cards imitating active studio boards */}
            {secondArt && secondArt.photos && secondArt.photos.length > 0 && (
              <framerMotion.div
                initial={{ opacity: 0, x: -30, rotate: -6 }}
                whileInView={{ opacity: 1, x: -10, rotate: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute left-4 md:left-12 w-64 md:w-80 rounded-xl border-2 border-primary/25 bg-background p-3 shadow-md rotate-[-4deg]"
              >
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-primary/5">
                  <img
                    src={secondArt.photos[0].url}
                    alt={secondArt.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-3 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary/50">
                    {secondArt.series}
                  </span>
                  <p className="font-[family-name:var(--font-display)] text-base text-primary mt-0.5">
                    {secondArt.title}
                  </p>
                </div>
              </framerMotion.div>
            )}

            {firstArt && firstArt.photos && firstArt.photos.length > 0 && (
              <framerMotion.div
                initial={{ opacity: 0, x: 30, rotate: 6 }}
                whileInView={{ opacity: 1, x: 20, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="absolute right-4 md:right-12 w-64 md:w-80 rounded-xl border-2 border-primary/25 bg-background p-3 shadow-xl rotate-[3deg] z-10"
              >
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-primary/5">
                  <img
                    src={firstArt.photos[0].url}
                    alt={firstArt.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-3 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary/50">
                    {firstArt.series}
                  </span>
                  <p className="font-[family-name:var(--font-display)] text-base text-primary mt-0.5">
                    {firstArt.title}
                  </p>
                </div>
              </framerMotion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
