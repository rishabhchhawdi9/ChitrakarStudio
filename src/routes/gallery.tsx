import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, heroImage, type Category, type Work } from "../lib/works";
import { STUDIO as staticStudio } from "../lib/studio";
import { useWorks, useStudio } from "../lib/store";
import { getPinterestFeed, type PinterestPin } from "../lib/pinterest";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, RefreshCw, Eye } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Gallery — ${staticStudio.name}` },
      {
        name: "description",
        content: `Selected murals, wall art, canvas and interior work by ${staticStudio.artist}.`,
      },
      { property: "og:title", content: `Gallery — ${staticStudio.name}` },
      {
        property: "og:description",
        content: `Hand-painted murals, wall art and canvas work from the ${staticStudio.name} studio.`,
      },
      { property: "og:image", content: heroImage },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const works = useWorks();
  const STUDIO = useStudio();
  const [viewMode, setViewMode] = useState<"studio" | "pinterest">("studio");
  const [filter, setFilter] = useState<Category | "All">("All");
  const [active, setActive] = useState<Work | null>(null);
  const [activePin, setActivePin] = useState<PinterestPin | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? works : works.filter((w) => w.category === filter)),
    [filter, works],
  );

  // React Query for live Pinterest feed
  const {
    data: pinterestPins,
    isLoading: isPinterestLoading,
    error: pinterestError,
    refetch: refetchPinterest,
    isFetching: isPinterestFetching,
  } = useQuery({
    queryKey: ["pinterestFeed"],
    queryFn: async () => {
      const res = await getPinterestFeed();
      if (!res.success) throw new Error(res.error || "Failed to fetch");
      return res.pins;
    },
    enabled: viewMode === "pinterest", // Only fetch when user switches to Pinterest view
  });

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">The Studio Wall</p>
          <h1 className="font-[family-name:var(--font-display)] text-primary text-6xl md:text-8xl -rotate-1 leading-none">
            Gallery
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg">
            A curated wall from the studio. Toggle below to see our main catalog or our live
            Pinterest workbench.
          </p>
        </header>

        {/* View Mode Toggle */}
        <div className="flex gap-6 mb-10 border-b-2 border-primary/10 pb-4">
          <button
            onClick={() => setViewMode("studio")}
            className={`pb-2 text-sm uppercase tracking-[0.2em] font-medium border-b-2 transition-all relative cursor-pointer ${
              viewMode === "studio"
                ? "border-primary text-primary"
                : "border-transparent text-primary/60 hover:text-primary"
            }`}
          >
            Curated Catalog
          </button>
          <button
            onClick={() => setViewMode("pinterest")}
            className={`pb-2 text-sm uppercase tracking-[0.2em] font-medium border-b-2 transition-all relative flex items-center gap-2 cursor-pointer ${
              viewMode === "pinterest"
                ? "border-primary text-primary"
                : "border-transparent text-primary/60 hover:text-primary"
            }`}
          >
            Live Pinterest Feed
            <span className="inline-flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </button>
        </div>

        {viewMode === "studio" ? (
          <>
            <div className="flex flex-wrap gap-2 mb-10">
              {(["All", ...CATEGORIES] as const).map((c) => {
                const on = filter === c;
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={
                      "px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] border-2 cursor-pointer transition-colors " +
                      (on
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-primary/30 text-primary hover:border-primary")
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((w, i) => (
                  <motion.figure
                    key={w.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                    className="break-inside-avoid cursor-zoom-in group"
                    onClick={() => setActive(w)}
                  >
                    <div className="relative overflow-hidden rounded-lg border-2 border-primary/25 group-hover:border-primary/70 transition-colors bg-card">
                      <img
                        src={w.url}
                        alt={`${w.title} — ${w.category} by ${STUDIO.name}`}
                        loading="lazy"
                        className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.04]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-[family-name:var(--font-display)] text-primary-foreground text-2xl">
                          {w.title}
                        </span>
                      </div>
                    </div>
                    <figcaption className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                      <span className="font-[family-name:var(--font-display)] text-primary text-lg normal-case tracking-normal">
                        {w.title}
                      </span>
                      <span className="text-primary/60">{w.category}</span>
                    </figcaption>
                  </motion.figure>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="animate-reveal">
            {/* Pinterest Profile Summary Banner */}
            <div className="bg-card rounded-2xl border-2 border-primary/15 p-6 md:p-8 mb-10 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-red-600 text-white flex items-center justify-center font-[family-name:var(--font-display)] text-3xl md:text-4xl shadow-md border-2 border-white shrink-0 select-none">
                  CF
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-primary leading-tight">
                    CHITRAKAR FINEARTS
                  </h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/60 mt-1">
                    @chitrakarartwork · Live Workpiece Board
                  </p>
                  <p className="mt-3 text-sm max-w-2xl text-primary/90 leading-relaxed">
                    Mural Artist | Wall Art | Restaurant Interiors | Commercial Artwork | Canvas
                    Paintings. This board displays live pictures directly from my official Pinterest
                    feed, showing behind-the-scenes projects and completed commissions.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                    <a
                      href={STUDIO.pinterest}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-xs uppercase tracking-wider rounded-full transition-colors shadow-sm cursor-pointer"
                    >
                      Visit Pinterest <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      onClick={() => refetchPinterest()}
                      disabled={isPinterestFetching}
                      className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-primary/20 hover:border-primary/50 text-primary font-medium text-xs uppercase tracking-wider rounded-full transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isPinterestFetching ? "Syncing..." : "Sync Live Pins"}{" "}
                      <RefreshCw
                        className={`h-3.5 w-3.5 ${isPinterestFetching ? "animate-spin" : ""}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pinterest Live Feed State Container */}
            {isPinterestLoading ? (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                <RefreshCw className="h-8 w-8 animate-spin text-primary/50" />
                <p className="text-sm uppercase tracking-[0.2em] text-primary/60">
                  Retrieving live pins...
                </p>
              </div>
            ) : pinterestError ? (
              <div className="py-16 text-center border-2 border-dashed border-primary/20 rounded-2xl max-w-lg mx-auto px-6">
                <p className="text-sm text-destructive font-medium mb-3">
                  Failed to synchronize with Pinterest.
                </p>
                <p className="text-xs text-primary/70 mb-6 leading-relaxed">
                  We couldn't reach Pinterest's feed. You can retry syncing or explore the artworks
                  directly on Pinterest.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => refetchPinterest()}
                    className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer"
                  >
                    Retry Sync
                  </button>
                  <a
                    href={STUDIO.pinterest}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 border-2 border-primary text-primary rounded-full text-xs uppercase tracking-wider font-medium cursor-pointer"
                  >
                    Open Pinterest
                  </a>
                </div>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-8">
                <AnimatePresence mode="popLayout">
                  {pinterestPins?.map((pin, i) => (
                    <motion.figure
                      key={pin.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                      className="break-inside-avoid cursor-zoom-in group relative pt-4"
                      onClick={() => setActivePin(pin)}
                    >
                      {/* Decorative Tape centered on top */}
                      <div className="tape left-1/2 -translate-x-1/2 top-0 z-10 rotate-[-1.5deg]" />

                      <div className="relative overflow-hidden rounded-lg border-2 border-primary/25 bg-card shadow-sm group-hover:shadow-md group-hover:border-primary/60 transition-all duration-300 rotate-[0.5deg] group-hover:rotate-0">
                        <img
                          src={pin.image}
                          alt={pin.title}
                          loading="lazy"
                          className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
                          referrerPolicy="no-referrer"
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="h-10 w-10 rounded-full bg-white text-primary flex items-center justify-center shadow-md border border-primary/10 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Eye className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <figcaption className="mt-3 px-1">
                        <p className="font-[family-name:var(--font-display)] text-primary text-base leading-tight group-hover:text-red-600 transition-colors">
                          {pin.title}
                        </p>
                        {pin.caption && pin.caption !== pin.title && (
                          <p className="mt-1 text-xs text-primary/70 line-clamp-2 leading-relaxed">
                            {pin.caption}
                          </p>
                        )}
                      </figcaption>
                    </motion.figure>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Local Art Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-primary/90 backdrop-blur-sm p-6 md:p-12 flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-5xl w-full max-h-full grid md:grid-cols-[1fr_260px] gap-6 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.url}
                alt={active.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="text-primary-foreground">
                <p className="text-xs uppercase tracking-[0.3em] opacity-70">{active.category}</p>
                <h2 className="font-[family-name:var(--font-display)] text-4xl mt-2">
                  {active.title}
                </h2>
                <p className="mt-4 text-sm opacity-90">{active.caption}</p>
                <button
                  onClick={() => setActive(null)}
                  className="mt-8 px-5 py-2 border-2 border-primary-foreground rounded-full text-xs uppercase tracking-[0.25em] hover:bg-primary-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pinterest Pin Lightbox */}
      <AnimatePresence>
        {activePin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePin(null)}
            className="fixed inset-0 z-[100] bg-primary/90 backdrop-blur-sm p-6 md:p-12 flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-5xl w-full max-h-full grid md:grid-cols-[1fr_280px] gap-6 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePin.image}
                alt={activePin.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="text-primary-foreground">
                <p className="text-xs uppercase tracking-[0.3em] opacity-70">
                  Live Pin · {new Date(activePin.pubDate).toLocaleDateString()}
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-3xl mt-2 leading-tight">
                  {activePin.title}
                </h2>
                {activePin.caption && activePin.caption !== activePin.title && (
                  <p className="mt-4 text-sm opacity-90 leading-relaxed max-h-[250px] overflow-y-auto pr-2">
                    {activePin.caption}
                  </p>
                )}
                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={activePin.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center cursor-pointer"
                  >
                    View Pin <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => setActivePin(null)}
                    className="px-5 py-2.5 border-2 border-primary-foreground rounded-full text-xs uppercase tracking-[0.2em] hover:bg-primary-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
