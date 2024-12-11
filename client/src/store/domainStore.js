import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/domain"
    : "/api/domain";

axios.defaults.withCredentials = true;

const useDomainStore = create((set) => ({
  domain: "",
  isAvailable: false,
  isLoading: false,
  message: "",
  error: null,

  setDomain: (domain) => set({ domain }),

  checkDomainAvailability: async (domain) => {
    set({ isLoading: true, error: null, message: "", isAvailable: false });
    try {
      const response = await axios.post(
        `${API_URL}/check`,
        {
          domain,
        }
      );
      set({
        message: response.data.message,
        isAvailable: response.data.isAvailable,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Erreur lors de la vérification",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  registerDomain: async (domain) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/register`,
        { domain }
      );
      window.location.href = response.data.url; // Redirection vers Stripe Checkout
    } catch (err) {
      set({
        error: err.response?.data?.message || "Erreur lors de l'enregistrement",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useDomainStore;
