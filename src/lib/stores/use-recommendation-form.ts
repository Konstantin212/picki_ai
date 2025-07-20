import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RecommendationFormData {
  productType: string | null;
  purpose: string | null;
  budget: number | null;
  parameters: string[];
  customPurpose?: string | null;
}

interface RecommendationFormState extends RecommendationFormData {
  currentStep: number;
  errors: Record<string, string>;
  isLoading: boolean;
  setField: <K extends keyof RecommendationFormData>(
    field: K,
    value: RecommendationFormData[K]
  ) => void;
  setStep: (step: number) => void;
  setError: (field: string, error: string) => void;
  clearErrors: () => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
  validateStep: (step: number) => boolean;
  canProceed: (step: number) => boolean;
}

const TOTAL_STEPS = 4;

export const useRecommendationForm = create<RecommendationFormState>()(
  persist(
    (set, get) => ({
      // Form data
      productType: null,
      purpose: null,
      budget: null,
      parameters: [],
      customPurpose: null,

      // UI state
      currentStep: 0,
      errors: {},
      isLoading: false,

      // Actions
      setField: (field, value) => {
        set((state) => ({
          ...state,
          [field]: value,
          errors: {
            ...state.errors,
            [field]: '', // Clear error when field is updated
          },
        }));
      },

      setStep: (step) => {
        if (step >= 0 && step < TOTAL_STEPS) {
          set({ currentStep: step });
        }
      },

      setError: (field, error) => {
        set((state) => ({
          errors: {
            ...state.errors,
            [field]: error,
          },
        }));
      },

      clearErrors: () => {
        set({ errors: {} });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      reset: () => {
        set({
          productType: null,
          purpose: null,
          budget: null,
          parameters: [],
          customPurpose: null,
          currentStep: 0,
          errors: {},
          isLoading: false,
        });
      },

      validateStep: (step) => {
        const state = get();
        const errors: Record<string, string> = {};

        switch (step) {
          case 0: // Product Type
            if (!state.productType) {
              errors.productType = 'required';
            }
            break;

          case 1: // Purpose
            if (!state.purpose) {
              errors.purpose = 'required';
            }
            break;

          case 2: // Budget
            if (!state.budget || state.budget <= 0) {
              errors.budget = 'invalidBudget';
            }
            break;

          case 3: // Parameters
            if (!state.parameters || state.parameters.length === 0) {
              errors.parameters = 'minParameters';
            }
            break;
        }

        set({ errors });
        return Object.keys(errors).length === 0;
      },

      canProceed: (step) => {
        const state = get();

        switch (step) {
          case 0:
            return !!state.productType;
          case 1:
            return !!state.purpose;
          case 2:
            return !!(state.budget && state.budget > 0);
          case 3:
            return !!(state.parameters && state.parameters.length > 0);
          default:
            return false;
        }
      },
    }),
    {
      name: 'recommendation-form-storage',
      partialize: (state) => ({
        productType: state.productType,
        purpose: state.purpose,
        budget: state.budget,
        parameters: state.parameters,
        customPurpose: state.customPurpose,
      }),
    }
  )
);
