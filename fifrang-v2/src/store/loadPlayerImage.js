import { create } from 'zustand';

const loadPlayerImage = create((set) => ({
    imageURL: [],
    setImageURL: (url) => set((state) => ({
        imageURL: [...state.imageURL, url],
    })),
}));

export default loadPlayerImage;