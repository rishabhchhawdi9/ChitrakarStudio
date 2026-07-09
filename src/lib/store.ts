import { useState, useEffect } from "react";
import { works as defaultWorks, type Work, type Category, CATEGORIES } from "./works";
import { ABSTRACT_ARTS as defaultAbstracts, type AbstractArtProject } from "./abstract-data";
import { STUDIO as defaultStudio } from "./studio";

// Local storage keys
const WORKS_KEY = "chitrakar_studio_works";
const ABSTRACTS_KEY = "chitrakar_studio_abstracts";
const STUDIO_KEY = "chitrakar_studio_info";

// Observers for state changes
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notify = () => {
  listeners.forEach((l) => l());
};

// Memory-backed caches
let worksCache = [...defaultWorks];
let abstractsCache = [...defaultAbstracts];
let studioCache = { ...defaultStudio };

// Initialize on client-side load
if (typeof window !== "undefined") {
  try {
    const savedWorks = localStorage.getItem(WORKS_KEY);
    if (savedWorks) {
      worksCache = JSON.parse(savedWorks);
    }
    const savedAbstracts = localStorage.getItem(ABSTRACTS_KEY);
    if (savedAbstracts) {
      abstractsCache = JSON.parse(savedAbstracts);
    }
    const savedStudio = localStorage.getItem(STUDIO_KEY);
    if (savedStudio) {
      studioCache = JSON.parse(savedStudio);
    }
  } catch (e) {
    console.error("Failed to load store from localStorage:", e);
  }
}

const saveWorks = (newWorks: Work[]) => {
  worksCache = newWorks;
  if (typeof window !== "undefined") {
    localStorage.setItem(WORKS_KEY, JSON.stringify(newWorks));
  }
  notify();
};

const saveAbstracts = (newAbstracts: AbstractArtProject[]) => {
  abstractsCache = newAbstracts;
  if (typeof window !== "undefined") {
    localStorage.setItem(ABSTRACTS_KEY, JSON.stringify(newAbstracts));
  }
  notify();
};

const saveStudio = (newStudio: typeof defaultStudio) => {
  studioCache = newStudio;
  if (typeof window !== "undefined") {
    localStorage.setItem(STUDIO_KEY, JSON.stringify(newStudio));
  }
  notify();
};

// React hooks to consume state reactively
export function useWorks(): Work[] {
  const [state, setState] = useState(worksCache);
  useEffect(() => {
    return subscribe(() => setState([...worksCache]));
  }, []);
  return state;
}

export function useAbstracts(): AbstractArtProject[] {
  const [state, setState] = useState(abstractsCache);
  useEffect(() => {
    return subscribe(() => setState([...abstractsCache]));
  }, []);
  return state;
}

export function useStudio(): typeof defaultStudio {
  const [state, setState] = useState(studioCache);
  useEffect(() => {
    return subscribe(() => setState({ ...studioCache }));
  }, []);
  return state;
}

// Utility to export current dynamic data
export function getExportData() {
  return {
    works: worksCache,
    abstracts: abstractsCache,
    studio: studioCache,
  };
}

// Store actions
export const storeActions = {
  // Works Gallery actions
  addWork: (work: Omit<Work, "id">) => {
    const id = "w-" + Date.now();
    const newWork: Work = { ...work, id };
    saveWorks([newWork, ...worksCache]);
    return newWork;
  },
  updateWork: (id: string, updated: Partial<Work>) => {
    const newWorks = worksCache.map((w) => (w.id === id ? { ...w, ...updated } : w));
    saveWorks(newWorks);
  },
  deleteWork: (id: string) => {
    const newWorks = worksCache.filter((w) => w.id !== id);
    saveWorks(newWorks);
  },

  // Abstract Projects actions
  addAbstract: (project: Omit<AbstractArtProject, "id">) => {
    const id = "abs-" + Date.now();
    const newProj: AbstractArtProject = { ...project, id };
    saveAbstracts([newProj, ...abstractsCache]);
    return newProj;
  },
  updateAbstract: (id: string, updated: Partial<AbstractArtProject>) => {
    const newAbstracts = abstractsCache.map((p) => (p.id === id ? { ...p, ...updated } : p));
    saveAbstracts(newAbstracts);
  },
  deleteAbstract: (id: string) => {
    const newAbstracts = abstractsCache.filter((p) => p.id !== id);
    saveAbstracts(newAbstracts);
  },

  // General settings actions
  updateStudio: (updated: Partial<typeof defaultStudio>) => {
    saveStudio({ ...studioCache, ...updated });
  },

  // Import / Reset settings
  importAll: (data: {
    works?: Work[];
    abstracts?: AbstractArtProject[];
    studio?: typeof defaultStudio;
  }) => {
    if (data.works && Array.isArray(data.works)) saveWorks(data.works);
    if (data.abstracts && Array.isArray(data.abstracts)) saveAbstracts(data.abstracts);
    if (data.studio && typeof data.studio === "object")
      saveStudio({ ...studioCache, ...data.studio });
  },
  resetToDefaults: () => {
    saveWorks([...defaultWorks]);
    saveAbstracts([...defaultAbstracts]);
    saveStudio({ ...defaultStudio });
  },
};
