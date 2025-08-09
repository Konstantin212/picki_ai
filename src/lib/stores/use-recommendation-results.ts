import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RecommendationJSON {
  query?: unknown;
  results?: unknown[];
  [key: string]: unknown;
}

interface RecommendationResultsState {
  byId: Record<string, RecommendationJSON>;
  save: (id: string, data: RecommendationJSON) => void;
  get: (id: string) => RecommendationJSON | undefined;
  clear: () => void;
}

export const useRecommendationResultsStore = create<RecommendationResultsState>()(
  persist(
    (set, get) => ({
      byId: {},
      save: (id, data) => set((state) => ({ byId: { ...state.byId, [id]: data } })),
      get: (id) => get().byId[id],
      clear: () => set({ byId: {} }),
    }),
    { name: 'recommendation-results' }
  )
);
