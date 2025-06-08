import { OutlinedCard } from "@/lib/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type CreativeAIStore = {
    outlines: OutlinedCard[] | [];
    setCurrentAiPrompt: (prompt: string) => void
    addMultipleOutlines: (outlines: OutlinedCard[]) => void;
    addOutlines: (outline: OutlinedCard) => void;
    currentAiPrompt: string
}

const useCreativeAIStore = create<CreativeAIStore>()(
    persist(
        (set) => ({
            currentAiPrompt: '',
            setCurrentAiPrompt: (prompt: string) => {
                set({currentAiPrompt: prompt})
            },
            outlines: [],
            addOutlines: (outline: OutlinedCard) => {
                set((state) => ({
                    outlines: [outline, ...state.outlines],
                }))
            },
            addMultipleOutlines: (outlines: OutlinedCard[]) => { 
                set(() => ({
                    outlines: [...outlines]
                }))
            },
        }),
        { 'name': 'creative-ai' }
    )
)

export default useCreativeAIStore