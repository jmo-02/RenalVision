import { create } from "zustand";

const useSymptomsModelStore = create((set) => ({
  currentAnimation: "Agony",

  setCurrentAnimation: (animation) => 
    set(() => ({
      currentAnimation: animation,
    })),
}));

export default useSymptomsModelStore;


