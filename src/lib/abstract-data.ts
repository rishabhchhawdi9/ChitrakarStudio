export type AbstractArtProject = {
  id: string;
  title: string;
  series: string;
  medium: string;
  dimensions: string;
  year: string;
  description: string;
  photos: {
    url: string;
    caption: string;
    aspect?: string; // e.g. "aspect-[4/5]" or "aspect-[3/4]"
  }[];
};

export const ABSTRACT_ARTS: AbstractArtProject[] = [
  {
    id: "abs-1",
    title: "Symphony of Rust & Indigo",
    series: "Abstract Series I",
    medium: "Mixed Media, Heavy Gesso, Oxide Pigments & Acrylic on Cradled Wood Panel",
    dimensions: '60" x 48" (5ft x 4ft)',
    year: "2026",
    description:
      "A deep, layered tactile study of natural oxidation and fluid currents, exploring the dialogue between coarse earth tones and serene deep blues. Painted using textured plaster, iron oxide compounds, and watered-down acrylic washes to mimic organic weathering processes.",
    photos: [
      {
        url: "/__l5e/assets-v1/fd190e03-f395-4ef8-a202-32824b3b2cff/art1.jpg",
        caption:
          "Complete frontal view showcasing the tense contrast between rust textures and deep indigo flows.",
      },
      {
        url: "/__l5e/assets-v1/8a032607-5695-434c-848a-f79239a8c720/art2.jpg",
        caption:
          "Macro detail of the central heavily-plastered fissure, showing the physical depth of the gesso.",
      },
      {
        url: "/__l5e/assets-v1/746402fa-9e9f-4fc9-90fd-30e3103f24ac/art3.jpg",
        caption: "Studio perspective under natural raking light, emphasizing the sculpted surface.",
      },
      {
        url: "/__l5e/assets-v1/49a9fd98-2422-4b07-ac2f-e67b7222212b/art4.jpg",
        caption:
          "Scale reference: installed in a minimalist living room setting with modern neutral decor.",
      },
    ],
  },
  {
    id: "abs-2",
    title: "Ethereal Echoes of Silent Arcs",
    series: "Abstract Series II",
    medium: "Acrylic, Marble Dust Plaster & Raw Pigment on Belgian Linen",
    dimensions: '72" x 54" (6ft x 4.5ft)',
    year: "2025",
    description:
      "Inspired by the transition of early morning light over architectural monoliths. This series features sweeping geometric curves and a muted, powdery pastel palette, conveying a sense of silent, slow-motion balance and ancient architectural weight.",
    photos: [
      {
        url: "/__l5e/assets-v1/9da52da2-da4e-4f3e-b2bb-49c7eba1da77/art6.jpg",
        caption:
          "Frontal presentation highlighting the elegant, overlapping archways and soft cream gradients.",
      },
      {
        url: "/__l5e/assets-v1/86415dab-7062-4ab2-84c6-5ee65df50e86/art7.jpg",
        caption: "Detail of the impasto texture where the marble dust plaster meets the raw linen.",
      },
      {
        url: "/__l5e/assets-v1/22cdc4ce-8c59-446f-9f38-d44d3277e246/art8.jpg",
        caption:
          "Warm afternoon light hitting the canvas in the studio, highlighting the dry, mineral finish.",
      },
      {
        url: "/__l5e/assets-v1/26fccac3-fe61-4272-8579-48c057d1a41d/art10.jpg",
        caption:
          "Gallery installation preview, displaying its monumental presence against a dark gallery wall.",
      },
    ],
  },
  {
    id: "abs-3",
    title: "Fractured Horizons",
    series: "Abstract Series III",
    medium: "24k Gold Leaf, Liquid Graphite, Charcoal & Oil on Canvas",
    dimensions: '54" x 54" (4.5ft x 4.5ft)',
    year: "2026",
    description:
      "An architectural exploration of verticality, erosion, and structural lines. The juxtaposition of delicate gold leaf fragments with rough, smoky charcoal washes creates a shimmering, tactile landscape that shifts dynamically with the viewer's relative position and lighting.",
    photos: [
      {
        url: "/__l5e/assets-v1/fb0e4be6-6ced-412e-b0a9-f3c17eb363ee/art11.jpg",
        caption:
          "Main panel view illustrating the stark vertical divides and the reflective gold leaf veins.",
      },
      {
        url: "/__l5e/assets-v1/d0a52f1a-ecf0-47a2-a0c7-961156c89029/art12.jpg",
        caption:
          "Detailed landscape view of the gold-leafing transition into heavy charcoal dust layers.",
      },
      {
        url: "/__l5e/assets-v1/77a0ebbb-4d8d-4d0b-b861-edd7a86af551/art13.jpg",
        caption:
          "Angle view on the active easel showing the painterly edge treatment and graphite gloss.",
      },
      {
        url: "/__l5e/assets-v1/6311e116-f8fd-4a9a-b69d-f903fb801c0b/art14.jpg",
        caption:
          "Extreme close-up showing the metallic crinkling of the 24k gold leaf layered over carbon.",
      },
    ],
  },
  {
    id: "abs-4",
    title: "Primal Obsidian & Ochre",
    series: "Abstract Series IV",
    medium: "Ash, Siennas, Natural Ochres, Soot-Black Acrylic & Sand on Heavy Canvas",
    dimensions: '64" x 48" (5.3ft x 4ft)',
    year: "2025",
    description:
      "Drawing from prehistoric cave drawings and the ancient textures of raw stone. Broad soot-black gestures and coarse volcanic sand overlay vibrant iron-oxide ochre pigments, invoking a primal, ritualistic sense of human mark-making and deep time.",
    photos: [
      {
        url: "/__l5e/assets-v1/ab39f5bd-8327-440b-bf0b-0c8dee68ebc6/art15.jpg",
        caption:
          "Complete composition showing the energetic obsidian strokes slicing across the warm, raw earth background.",
      },
      {
        url: "/__l5e/assets-v1/8ef86b8b-9101-4930-b57e-4b5241f70fc7/art16.jpg",
        caption:
          "Close-up of the energetic charcoal sweep, revealing the underlying granular sand texture.",
      },
      {
        url: "/__l5e/assets-v1/7c21b286-cac7-46f1-8884-70a7898061c6/art17.jpg",
        caption:
          "Detail showing transparent glaze layers of raw sienna built up over the dark, dense gestures.",
      },
      {
        url: "/__l5e/assets-v1/025681a5-1ede-4001-b340-bab6fbe05e3c/art18.jpg",
        caption:
          "Framing view highlighting the raw, painted gallery-wrap edges of the museum-grade canvas.",
      },
    ],
  },
  {
    id: "abs-5",
    title: "Monolithic Echoes",
    series: "Abstract Series V",
    medium: "Minimalist Gesso relief & Carbon Pigments on Custom Linen Board",
    dimensions: '80" x 40" (6.6ft x 3.3ft)',
    year: "2026",
    description:
      "A monumentally scaled quiet meditation on negative space, vertical mass, and heavy physical balance. Features a massive, sculptural monochrome block contrasted against the warm, organic weave of unprimed raw linen.",
    photos: [
      {
        url: "/__l5e/assets-v1/6fc86596-e344-407b-a03e-88c66658a254/art19.jpg",
        caption:
          "Main front view highlighting the imposing, tall monolith and its subtle texture gradient.",
      },
      {
        url: "/__l5e/assets-v1/2cbf303d-2975-450f-82e9-37a35f0d83c0/art20.jpg",
        caption:
          "Texture closeup of the hand-troweled sculptural ridges that run the length of the dark block.",
      },
      {
        url: "/__l5e/assets-v1/c49c3520-2c83-4987-9ab7-5d6f8519180c/art22.jpg",
        caption:
          "Studio photo capturing the depth of the relief shadow cast under soft side-window illumination.",
      },
      {
        url: "/__l5e/assets-v1/bd026e1f-273d-4057-b381-4f8ed9207588/art23.jpg",
        caption:
          "Installed context showcasing the monolithic scale against a tall ceiling in a contemporary boardroom.",
      },
    ],
  },
];
