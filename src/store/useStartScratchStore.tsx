import { OutlinedCard } from "@/lib/types"
import { create } from 'zustand'
import { devtools, persist } from "zustand/middleware"

type OutlineStore = {
    outlines: OutlinedCard[]
    resetOutlines: () => void
    addOutlines: (outline: OutlinedCard) => void
    addMultipleOutlines: (outlines: OutlinedCard[]) => void
}


const useScratchStore = create<OutlineStore>()(
    devtools(
        persist(
            (set) => ({
                outlines: [],
                resetOutlines: () => {
                    set({ outlines: [] })
                },
                addOutlines: (outline: OutlinedCard) => {
                    set((state) => ({
                        outlines: [...state.outlines, outline],
                    }))
                },
                addMultipleOutlines: (outlines: OutlinedCard[]) => {
                    set(() => ({
                        outlines: [...outlines],
                    }))
                }
            }),{name: 'scratch'}
        )
    )
)

export default useScratchStore