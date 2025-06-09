'use client'

import { useRouter } from 'next/navigation'
import React, { use, useState } from 'react'
import { motion } from 'framer-motion'
import { containerVariats, itemVarients } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import useCreativeAIStore from '@/store/useCreativeAiStore'
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select'
import { SelectItem, SelectValue } from '@radix-ui/react-select'
import CardList from '../Common/CardList'
import usePromptStore from '@/store/usePromptStore'
import RecentPrompts from './RecentPrompt'
import { toast } from 'sonner'
import { generateCreativePrompt } from '@/actions/generativeAI'

type Props = {
    onBack: () => void,

}

const CreateAI = ({ onBack }: Props) => {

    const router = useRouter()
    const { resetOutline,
        currentAiPrompt,
        setCurrentAiPrompt,
        outlines,
        addMultipleOutlines,
        addOutlines } = useCreativeAIStore()
    const [editingCard, setEditingCard] = useState<string | null>(null)
    const [editText, setEditText] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedCard, setSelectedCard] = useState<string | null>(null)
    const [noOfCards, setNoOfCards] = useState(0)
    const { prompts, addPrompt } = usePromptStore()

    const generateOutline = async () => {
        if(currentAiPrompt === ""){
            toast.error('Error',{
                description: "Please enter a prompt to generate an outline."
            })
            return
        }

        setIsGenerating(true)
        const res = await generateCreativePrompt(currentAiPrompt)

     }
    const resetCards = () => {
        setEditingCard(null)
        setSelectedCard(null)
        setEditText('')

        setCurrentAiPrompt('')
        resetOutline()
    }

    const handleBack = () => {
        onBack()
    }

    const handleGenerate = () => {

    }
    return (
        <motion.div
            className='space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:p-8'
            variants={containerVariats}
            initial="hidden"
            animate="visible">
            <Button
                onClick={handleBack}
                variant="outline"
                className='m-4'
            >
                <ChevronLeft className='mr-2 h-4 w-4' />
                Back
            </Button>
            <motion.div
                variants={itemVarients}
                className='text-center space-y-2'
            >
                <h1 className='text-4xl font-bold text-primary'>
                    Genrate with <span className='text-vivid'>Creative AI</span>
                </h1>
                <p className='text-secondary'>What would like to create today?</p>
                <motion.div
                    className='bg-primary/10 p-4 rounded-xl'
                    variants={itemVarients}>
                    <div className='flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl'>
                        <Input
                            placeholder='Enter Prompt and add to the cards ...'
                            className='text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow'
                            required
                            value={currentAiPrompt}
                            onChange={(e) => setCurrentAiPrompt(e.target.value)}
                        />

                        <div className='flex items-center gap-3'>
                            <Select
                                value={noOfCards.toString()}
                                onValueChange={(value) => setNoOfCards(parseInt(value))} >
                                <SelectTrigger className='w-fit gap-2 font-semibold shadow-xl'>
                                    <SelectValue placeholder="Select number of cards" />
                                </SelectTrigger>
                                <SelectContent
                                    className='w-fit' >
                                    {outlines.length === 0 ? (
                                        <SelectItem
                                            value='0'
                                            className='font-semibold'>
                                            No cards
                                        </SelectItem>
                                    ) : (
                                        Array.from({ length: outlines.length }, (_, idx) => idx + 1
                                        ).map((num) => (
                                            <SelectItem
                                                key={num}
                                                value={num.toString()}
                                                className='font-semibold'>
                                                {num} {num === 1 ? "Card" : "Cards"}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>

                            <Button
                                variant="destructive"
                                onClick={resetCards}
                                size="icon"
                                aria-label='Reset cards'
                            >
                                <RotateCcw className='h-4 w-4' />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            <div className='w-full flex justify-center items-center'>
                <Button className='font-medium text-lg flex gap-2 items-center'
                    onClick={generateOutline}
                    disabled={isGenerating}>
                    {isGenerating ? (
                        <>
                            <Loader2 className='animate-spin mr-2' />Generating...
                        </>
                    ) : (
                        'Generate Outline'
                    )}
                </Button>
            </div>

            <CardList outline={outlines}
                addOutline={ addOutlines}
                addMultipleOutlines={addMultipleOutlines}
                editingCard={editingCard}
                selectedCard={selectedCard}
                editText={editText}
                onEditChange={setEditText}
                onCardSelect={setSelectedCard} 
                setEditText={setEditText}
                setEditingCard={setEditingCard}
                setSelectedCard={setSelectedCard}
                onCardDoubleClick={(id, title) => {
                    setEditingCard(id)
                    setEditText(title)
                }}
                />
                {outlines.length > 0 && (
                    <Button
                    className='w-full'
                    onClick={handleGenerate}
                    disabled={isGenerating}>
                        {isGenerating ? (
                            <>
                            <Loader2  className='animate-spin mr-2 '/> Generating...
                            </>
                        ) : (
                            'Generate'
                        ) }
                    </Button>
                ) }

                {
                    prompts?.length > 0 && <RecentPrompts />
                }

        </motion.div> 
    )
}

export default CreateAI