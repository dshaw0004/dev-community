import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TagsState {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  setTags: (tags: string[]) => void;
}

const useTags = create<TagsState>()(
  persist(
    (set, get) => ({
      tags: [],
      addTag: (tag) => {
        // Avoid adding duplicate tags
        if (get().tags.includes(tag)) {
          return;
        }
        set((state) => ({ tags: [...state.tags, tag].sort() }));
      },
      removeTag: (tag) => {
        set((state) => ({ tags: state.tags.filter((t) => t !== tag) }));
      },
      setTags: (tags) => {
        set({ tags: [...new Set(tags)].sort() }); // Ensure unique tags and sort
      },
    }),
    {
      name: 'dev-community-tags-storage', // unique name for the storage
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage for persistence
    }
  )
);

export default useTags;