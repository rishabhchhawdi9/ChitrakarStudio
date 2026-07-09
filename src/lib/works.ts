export type Category = "Mural" | "Wall Art" | "Canvas" | "Interior" | "Portrait" | "Commercial";

export type Work = {
  id: string;
  url: string;
  title: string;
  category: Category;
  caption: string;
  featured?: boolean;
};

export const works: Work[] = [
  {
    id: "w1",
    url: "https://i.pinimg.com/736x/63/6c/a3/636ca320b14be7718a311ca9cc148bab.jpg",
    title: "Jungle Reverie",
    category: "Mural",
    caption: "Hand-painted feature wall for a Faridabad residence.",
    featured: true,
  },
  {
    id: "w2",
    url: "https://i.pinimg.com/736x/02/d6/13/02d613abceb7a001e690272b9c852768.jpg",
    title: "Sunburst Motif",
    category: "Wall Art",
    caption: "Decorative motif for a boutique café.",
    featured: true,
  },
  {
    id: "w3",
    url: "https://i.pinimg.com/736x/c1/2b/e5/c12be50f50a870d0a9d8c10ebad897f0.jpg",
    title: "Study in Ochre",
    category: "Canvas",
    caption: "Original canvas, mixed media.",
    featured: true,
  },
  {
    id: "w4",
    url: "https://i.pinimg.com/736x/a0/8c/b7/a08cb757619335c16f5548e4e43bb0f5.jpg",
    title: "Restaurant Wall — Kilim",
    category: "Interior",
    caption: "Full interior styling with hand-painted panels.",
    featured: true,
  },
  {
    id: "w5",
    url: "https://i.pinimg.com/736x/06/1c/1e/061c1e5ab8bb7b74a65ce7b2f1981ab2.jpg",
    title: "Village Fresco",
    category: "Mural",
    caption: "Story-driven mural for a heritage café.",
  },
  {
    id: "w6",
    url: "https://i.pinimg.com/736x/97/e8/d8/97e8d8455fc2541f4f036c3946eb80a2.jpg",
    title: "Terrace Diner",
    category: "Interior",
    caption: "Restaurant terrace with painted arches.",
    featured: true,
  },
  {
    id: "w7",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=736&q=80",
    title: "Portrait Study I",
    category: "Portrait",
    caption: "Commissioned portrait, acrylic on canvas.",
  },
  {
    id: "w8",
    url: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=736&q=80",
    title: "Floral Chorus",
    category: "Wall Art",
    caption: "Layered floral wall for a stylist's studio.",
  },
  {
    id: "w9",
    url: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=736&q=80",
    title: "Still Life, Warm",
    category: "Canvas",
    caption: "Original canvas commissioned for a client home.",
  },
  {
    id: "w10",
    url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=736&q=80",
    title: "Kids' Room Safari",
    category: "Mural",
    caption: "Full-wall mural for a children's bedroom.",
    featured: true,
  },
  {
    id: "w11",
    url: "https://i.pinimg.com/736x/cf/02/0f/cf020fc96716b03d1e264dc7b2709375.jpg",
    title: "Brand Signage Wall",
    category: "Commercial",
    caption: "Brand identity hand-painted for a retail space.",
  },
  {
    id: "w12",
    url: "https://i.pinimg.com/736x/e5/e9/a3/e5e9a31e4ff64a8f81a2b240ee9bc456.jpg",
    title: "Peach & Palm",
    category: "Wall Art",
    caption: "Modern botanical for a wellness studio.",
  },
  {
    id: "w13",
    url: "https://i.pinimg.com/736x/98/5d/4f/985d4fc0206833521af35bbb3b4bc1ec.jpg",
    title: "Studio Notes",
    category: "Canvas",
    caption: "Work in progress from the studio wall.",
  },
  {
    id: "w14",
    url: "https://i.pinimg.com/736x/ba/b9/ee/bab9eee38e941dee5e3b42982f586665.jpg",
    title: "Café Corner",
    category: "Interior",
    caption: "Cozy nook painted end-to-end.",
  },
  {
    id: "w15",
    url: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=736&q=80",
    title: "Blue Hour",
    category: "Mural",
    caption: "Night-scene mural on an entryway wall.",
  },
  {
    id: "w16",
    url: "https://i.pinimg.com/736x/d9/e1/2b/d9e12b794138b6a228c74b9c89988168.jpg",
    title: "Canvas No. 23",
    category: "Canvas",
    caption: "Abstract composition, mixed media.",
  },
  {
    id: "w17",
    url: "https://i.pinimg.com/736x/49/ba/28/49ba281091d7624db74151a798a1568b.jpg",
    title: "Colour Study",
    category: "Canvas",
    caption: "Palette study, acrylic on board.",
  },
  {
    id: "w18",
    url: "https://i.pinimg.com/736x/0f/c8/d1/0fc8d15d2a53b1ae8ddf6dbaaeba3d19.jpg",
    title: "Detail Work",
    category: "Wall Art",
    caption: "Close-up of hand-lettered detail.",
  },
  {
    id: "w19",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=736&q=80",
    title: "Sketchbook Page",
    category: "Portrait",
    caption: "Studio sketch from the working book.",
  },
  {
    id: "w20",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=736&q=80",
    title: "Portrait Study II",
    category: "Portrait",
    caption: "Portrait commission in progress.",
  },
];

export const CATEGORIES: Category[] = [
  "Mural",
  "Wall Art",
  "Canvas",
  "Interior",
  "Portrait",
  "Commercial",
];

export const heroImage = "https://i.pinimg.com/736x/63/6c/a3/636ca320b14be7718a311ca9cc148bab.jpg";
export const portraitImage =
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=736&q=80";
