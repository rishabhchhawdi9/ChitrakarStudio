import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ABSTRACT_ARTS, type AbstractArtProject } from "../lib/abstract-data";
import { STUDIO } from "../lib/studio";
import { Eye, ArrowRight, CornerDownRight, Maximize2, Sparkles, Sliders } from "lucide-react";

export const Route = createFileRoute("/abstract")({
  head: () => ({
    meta: [
      { title: `Abstract Collection — ${STUDIO.name}` },
      {
        name: "description",
        content: `Explore the tactile, large-format abstract canvases of ${STUDIO.artist}. Sculpted gesso, natural pigments, and multi-perspective views.`,
      },
      { property: "og:title", content: `Abstract Collection — ${STUDIO.name}` },
      {
        property: "og:description",
        content: `Tactile, textured abstract collections by ${STUDIO.artist}.`,
      },
      { property: "og:url", content: "/abstract" },
    ],
    links: [{ rel: "canonical", href: "/abstract" }],
  }),
  component: AbstractPage,
});

function AbstractPage() {
  const [selectedProject, setSelectedProject] = useState<AbstractArtProject>(ABSTRACT_ARTS[0]);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [zoomPhotoIndex, setZoomPhotoIndex] = useState<number>(0);

  // When selected project changes, reset the active photo index
  useEffect(() => {
    setActivePhotoIndex(0);
  }, [selectedProject]);

  // Handle keyboard navigation for the lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        setZoomPhotoIndex((prev) => (prev + 1) % selectedProject.photos.length);
      } else if (e.key === "ArrowLeft") {
        setZoomPhotoIndex(
          (prev) => (prev - 1 + selectedProject.photos.length) % selectedProject.photos.length,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, selectedProject]);

  const openLightbox = (index: number) => {
    setZoomPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-background text-primary min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="px-6 pt-16 pb-10 md:pt-24 md:pb-16 border-b border-primary/10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">
            Tactile Materiality &amp; Space
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl -rotate-1 leading-none tracking-tight">
                Abstract Arts
              </h1>
              <p className="mt-6 max-w-2xl text-base md:text-lg text-primary/80 leading-relaxed">
                A dedicated space exploring <strong>{STUDIO.artist}'s</strong> experimental abstract
                studio practice. These are monumentally scaled, heavily textured canvases where
                negative space dialogue meets hand-sculpted relief dust, raw minerals, and natural
                oxides.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center text-xs uppercase tracking-wider font-semibold border-2 border-primary/20 rounded-2xl p-4 bg-card max-w-md">
              <div className="flex items-center gap-2 text-primary/70">
                <Sliders className="h-4 w-4 shrink-0 text-primary" />
                <span>Interactions:</span>
              </div>
              <span className="bg-primary/10 px-2 py-1 rounded">Interactive series picker</span>
              <span className="bg-primary/10 px-2 py-1 rounded">Multi-angle photos</span>
              <span className="bg-primary/10 px-2 py-1 rounded">Macro Zoom Lightbox</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE MAIN WORKSPACE */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Series selector bar */}
          <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 mb-12 border-b border-primary/10 scrollbar-none">
            {ABSTRACT_ARTS.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`px-6 py-3 rounded-full text-xs uppercase tracking-[0.25em] border-2 cursor-pointer transition-all shrink-0 font-medium ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-102"
                      : "border-primary/20 text-primary hover:border-primary/60 hover:bg-primary/5"
                  }`}
                >
                  {proj.series}
                </button>
              );
            })}
          </div>

          {/* Active Series Presentation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT BOARD - Dynamic Photo Workspace */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Active Image Display */}
              <div className="relative pt-6">
                {/* Visual Artist's Tape Detail */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-yellow-100/50 dark:bg-yellow-950/20 shadow-sm border border-yellow-200/20 backdrop-blur-xs z-10 rotate-[-1deg] pointer-events-none" />

                <div className="relative group overflow-hidden rounded-xl border-2 border-primary/20 bg-card shadow-lg transition-all duration-500">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedProject.id}-${activePhotoIndex}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="relative cursor-zoom-in aspect-[4/5] sm:aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/5] flex items-center justify-center overflow-hidden"
                      onClick={() => openLightbox(activePhotoIndex)}
                    >
                      <img
                        src={selectedProject.photos[activePhotoIndex].url}
                        alt={`${selectedProject.title} — ${selectedProject.photos[activePhotoIndex].caption}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                        referrerPolicy="no-referrer"
                      />

                      {/* Interactive Visual Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="text-white flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <Maximize2 className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-widest text-white/80">
                              View full scale
                            </p>
                            <p className="text-sm font-semibold font-[family-name:var(--font-display)]">
                              Click to open detail zoom
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Photo Perspectives Toggles (Multi-Angle Thumbnails) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary/60 font-medium px-1">
                  <CornerDownRight className="h-3.5 w-3.5" />
                  <span>Choose photographic perspective:</span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {selectedProject.photos.map((photo, index) => {
                    const isActive = activePhotoIndex === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setActivePhotoIndex(index)}
                        className={`group relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          isActive
                            ? "border-primary scale-[1.03] shadow-md ring-4 ring-primary/10"
                            : "border-primary/20 hover:border-primary/60 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt="Thumbnail perspective"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {/* Interactive overlay tag */}
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                        <div className="absolute bottom-1 right-1 bg-background/90 text-[9px] font-mono px-1 rounded border border-primary/10 scale-90 sm:scale-100">
                          0{index + 1}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Photo Caption Display */}
              <div className="bg-card border border-primary/10 rounded-xl p-4 italic text-sm text-primary/80 shadow-xs flex items-start gap-3">
                <span className="text-primary/40 font-mono text-xs mt-0.5 shrink-0">
                  [Photo Context 0{activePhotoIndex + 1}]
                </span>
                <p className="leading-relaxed">
                  {selectedProject.photos[activePhotoIndex].caption}
                </p>
              </div>
            </div>

            {/* RIGHT BOARD - Details & Curator Philosophy */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              {/* Release Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/15 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium text-primary">
                  <Sparkles className="h-3 w-3" />
                  <span>
                    {selectedProject.series} · Released {selectedProject.year}
                  </span>
                </div>

                <h2 className="font-[family-name:var(--font-display)] text-primary text-4xl md:text-5xl tracking-tight leading-none mt-2">
                  {selectedProject.title}
                </h2>
              </div>

              {/* Technical Specifications Sheet */}
              <div className="bg-card border-2 border-primary/15 rounded-xl overflow-hidden shadow-xs">
                <div className="px-5 py-3 border-b border-primary/10 bg-primary/2 text-xs uppercase tracking-[0.2em] font-bold text-primary/70 flex justify-between items-center">
                  <span>Physical Properties</span>
                  <span className="text-[10px] font-mono">ID: {selectedProject.id}</span>
                </div>
                <div className="p-5 space-y-4 text-sm divide-y divide-primary/5">
                  <div className="flex justify-between items-start gap-4 pt-0">
                    <span className="text-xs uppercase tracking-wider text-primary/50 shrink-0 mt-0.5">
                      Medium
                    </span>
                    <span className="text-right font-medium text-primary/95">
                      {selectedProject.medium}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4 pt-3">
                    <span className="text-xs uppercase tracking-wider text-primary/50 shrink-0">
                      Canvas Scale
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-lg text-primary">
                      {selectedProject.dimensions}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4 pt-3">
                    <span className="text-xs uppercase tracking-wider text-primary/50 shrink-0">
                      Framing Option
                    </span>
                    <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-sm">
                      Unframed Gallery Wrap
                    </span>
                  </div>
                </div>
              </div>

              {/* Creative Story & Conceptual Notes */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.3em] text-primary/60 font-bold border-b border-primary/15 pb-2">
                  Creative Philosophy
                </h3>
                <p className="text-base leading-relaxed text-primary/85">
                  {selectedProject.description}
                </p>
              </div>

              {/* Curators Journal / Studio Logs */}
              <div className="relative p-6 rounded-xl bg-orange-50/20 dark:bg-amber-950/5 border border-amber-300/20 dark:border-amber-950/30 overflow-hidden">
                {/* Distressed notebook line overlay on the side */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400/40" />
                <h4 className="font-mono text-xs text-amber-800 dark:text-amber-400/80 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
                  <span>● Studio Journal Notes</span>
                </h4>
                <p className="font-sans text-sm text-primary/80 italic leading-relaxed">
                  "Abstract canvases depend entirely on the chemistry of the light they stand in.
                  For {selectedProject.title}, the physical weight of the marble dust relief casts
                  tiny landscape shadows during sunset, changing the balance of the composition
                  across the course of the day. Best hung where it catches direct morning or late
                  afternoon light."
                  <span className="block mt-2 font-mono text-[11px] not-italic text-primary/50 text-right">
                    — Tarun, Studio Log
                  </span>
                </p>
              </div>

              {/* Call to action: Direct contact setup */}
              <div className="pt-2">
                <Link
                  to="/contact"
                  search={{
                    subject: `Inquiry regarding ${selectedProject.title} (${selectedProject.series})`,
                  }}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium text-xs uppercase tracking-[0.25em] rounded-full hover:scale-102 active:scale-98 transition-transform cursor-pointer shadow-md"
                >
                  Inquire About This Series
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-center text-[11px] text-primary/50 mt-3">
                  Original canvases are shipped globally inside heavy wooden crates. Certificate of
                  authenticity included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE MATERIAL PHILOSOPHY SHOWCASE */}
      <section className="px-6 py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract design elements background */}
        <div className="absolute right-0 bottom-0 opacity-5 w-[400px] h-[400px] rounded-full border-[30px] border-primary-foreground pointer-events-none translate-x-1/3 translate-y-1/3" />

        <div className="mx-auto max-w-7xl relative">
          <div className="max-w-3xl mb-16">
            <p className="text-xs uppercase tracking-[0.4em] opacity-75 mb-4">
              Inside the Practice
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl -rotate-1 leading-none tracking-tight">
              Honoring the Material
            </h2>
            <p className="mt-6 text-base md:text-lg opacity-85 leading-relaxed">
              To Tarun Sharma, abstract painting is not an escape from reality, but an immersion
              into the visceral, heavy truth of pure physical materials. By eliminating
              representative forms, the hand-painted medium becomes the complete voice of the work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 space-y-4">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-sm font-mono font-bold">
                01
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl">
                Sculpted relief dust
              </h3>
              <p className="text-sm opacity-80 leading-relaxed">
                By blending dense Italian marble dust and gesso, we build highly architectural,
                sculpted relief structures. The physical surfaces rise up to 1 inch from the canvas
                board, carving real physical depth.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 space-y-4">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-sm font-mono font-bold">
                02
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl">Earth Chemistry</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                We synthesize our own painting pigments using natural siennas, raw iron-oxides, ash,
                soot, and dynamic metal foils. This guarantees rich, lightfast organic hues that
                feel fundamentally connected to the earth.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 space-y-4">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-sm font-mono font-bold">
                03
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl">Monumental Scale</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Abstract works must alter the space they inhabit. Our series are stretched on custom
                heavy-duty pine frames ranging from 5 to 8 feet in scale, completely enveloping the
                viewer’s visual field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FULLSCREEN IMMERSIVE LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center cursor-zoom-out"
          >
            {/* Top Close bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center text-white z-10 bg-gradient-to-b from-black/80 to-transparent">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                  {selectedProject.series}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="h-12 w-12 rounded-full border-2 border-white/20 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                ×
              </button>
            </div>

            {/* Main Interactive Zoom Image */}
            <div
              className="relative max-w-5xl w-full max-h-[75vh] flex items-center justify-center px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={zoomPhotoIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={selectedProject.photos[zoomPhotoIndex].url}
                  alt="Zoomed Art View"
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Slider Left Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomPhotoIndex(
                    (prev) =>
                      (prev - 1 + selectedProject.photos.length) % selectedProject.photos.length,
                  );
                }}
                className="absolute left-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer select-none"
                aria-label="Previous image"
              >
                ‹
              </button>

              {/* Slider Right Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomPhotoIndex((prev) => (prev + 1) % selectedProject.photos.length);
                }}
                className="absolute right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer select-none"
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            {/* Bottom Caption details */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-center text-white space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm max-w-2xl mx-auto text-white/90 leading-relaxed font-sans px-4">
                {selectedProject.photos[zoomPhotoIndex].caption}
              </p>

              {/* Lightbox Mini Picker indicators */}
              <div className="flex justify-center gap-3">
                {selectedProject.photos.map((_, index) => {
                  const isActive = zoomPhotoIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setZoomPhotoIndex(index)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${isActive ? "w-8 bg-white" : "w-2 bg-white/30"}`}
                      aria-label={`Go to photo ${index + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
