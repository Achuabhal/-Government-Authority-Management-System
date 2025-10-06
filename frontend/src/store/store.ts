import { create } from 'zustand';
import api from '../lib/api';

type Theme = 'normal' | 'independence-day';

interface DataStore {
  galleryImages: any[];
  data: any[];
  newsItems: any[]; // store news items here
  theme: Theme;
  loading: boolean;
  fetchData: () => Promise<void>;
}

export const useDataStore = create<DataStore>((set) => ({
  data: [],
  newsItems: [], // initialize it
  galleryImages: [],
  theme: 'normal',
  loading: false,
  fetchData: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/content/all-content');

      // Extract newsItems from API response
      const newsItems = Array.isArray(response.data.newsItems)
        ? response.data.newsItems
        : [];

      const galleryImages = Array.isArray(response.data.galleryImages)
        ? response.data.galleryImages
        : [];

      const toggle = response.data.toggle; // Extract toggle from response
      set({
        data: response.data,
        newsItems, // set it in the store
        theme: toggle ? 'independence-day' : 'normal',
        loading: false,
        galleryImages,
      });

      console.log('Data fetched:', response.data);
      console.log('News items:', newsItems);
      console.log('Current theme from store:', useDataStore.getState().theme);
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ loading: false });
    }
  },
}));
