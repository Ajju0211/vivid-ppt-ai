'use client'

import { OutlinedCard } from '@/lib/types'
import React, { useRef, useState } from 'react'
import { AnimatePresence, keyframes, motion } from 'framer-motion'
import Card from './Card'

import { title } from 'process'
import AddCardButton from './AddCardButton'
type Props = {
    outline: OutlinedCard[]
    editingCard: string | null
    selectedCard: string | null
    editText: string
    addOutline?: (card: OutlinedCard) => void
    onEditChange: (value: string) => void
    onCardSelect: (id: string) => void
    onCardDoubleClick: (id: string, title: string) => void
    setEditText: (value: string) => void
    setEditingCard: (id: string | null) => void
    setSelectedCard: (id: string | null) => void
    addMultipleOutlines: (cards: OutlinedCard[]) => void
}

const CardList = ({
    outline,
    editText,
    editingCard,
    onCardDoubleClick,
    onCardSelect,
    onEditChange,
    addMultipleOutlines,
    selectedCard,
    setEditText,
    setEditingCard,
    setSelectedCard,
    addOutline,
}: Props) => {
    const [draggedItem, setDraggedItem] = useState<OutlinedCard | null>(null);

    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
    const  dargOffsetY = useRef<number>(0)

    const onDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        if (!draggedItem) return

        const rect = e.currentTarget.getBoundingClientRect()
        const y = e.clientY - rect.top
        const threashold = rect.height / 2

        if (y < threashold) {
            setDragOverIndex(index)
        } else {
            setDragOverIndex(index + 1)
        }
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (!draggedItem || dragOverIndex === null) return
        const updatedCards = [...outline]
        const draggedIndex = updatedCards.findIndex(
            (card) => card.id === draggedItem.id
        )

        if (draggedIndex === -1 || draggedIndex === dragOverIndex) return
        const [removedCard] = updatedCards.splice(draggedIndex, 1)
        updatedCards.splice(
            dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex, 0, removedCard
        )

        addMultipleOutlines(updatedCards.map((card, index) => ({
            ...card, order: index + 1
        })))
        setDraggedItem(null)
        setDragOverIndex(null)

    }
        const onCardUpdate = (id: string, newTitle: string) => {
        addMultipleOutlines(outline.map((card) =>
                card.id === id ? { ...card, title: newTitle } : card
            ))
            setEditingCard(null)
            setSelectedCard(null)
            setEditText('')
    }

    const onCardDelete = (id: string ) => {
        addMultipleOutlines(outline
            .filter((card) => card.id !== id)
            .map((card,index) => ({...card, order: index + 1})))
    }

    const ondragstart = (e: React.DragEvent, card: OutlinedCard) => {
        setDraggedItem(card)
        e.dataTransfer.effectAllowed = 'move'
        
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()

        dargOffsetY.current = e.clientY - rect.top

        const draggedEl = e.currentTarget.cloneNode(true) as HTMLElement

        draggedEl.style.position = 'absolute'
        draggedEl.style.top =  '-1000px'
        draggedEl.style.opacity = '0.8'
        draggedEl.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px}`
        document.body.appendChild(draggedEl)
        e.dataTransfer.setDragImage(draggedEl, 0, dargOffsetY.current)
        
        setTimeout(() => {
            setDragOverIndex(outline.findIndex((c) => c.id === card.id))
            document.body.removeChild(draggedEl)
        },0)
    }

    const onDragEnd = () => {
        setDragOverIndex(null)
        setDraggedItem(null)
    }

    const getDragOverStyles = (index : number )  => {
        if(dragOverIndex === null || draggedItem === null ) return {}

        if(index === dragOverIndex){
            return {
                borderTop: '2px solid #000',
                marginTop: '0.5rem',
                trnasition: 'margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }
        }
        else if (index === dragOverIndex -1 ) {
            return {
                borderBottom: '2px solid #000',
                marginBottom: '0.5',
                transition: 'margin 0.2s cubic-bezier(0.25s, 0.1, 0.25, 1)'
            }
        }

        return {}

    }

    const onAddCard = (index: number) => {
        const newCard: OutlinedCard = {
            id: Math.random().toString(36).substring(2,9),
            title: editText || 'New Section',
            order: (index !== undefined ? index + 1 : outline.length) +1 
        }

        const updatedCards = 
        index !== undefined ? [
            ...outline.slice(0, index + 1),
            newCard,
            ...outline.slice(index+1)
            .map((card) => ({ ...card, order: card.order + 1})),
        ] : [...outline, newCard]

        addMultipleOutlines(updatedCards)
        setEditText('')
    }

    return (
        <motion.div
            className='space-y-2 -my-2'
            layout
            onDragOver={(e) => {
                e.preventDefault()
                if (outline.length === 0 || e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20) {
                    onDragOver(e, outline.length

                    )
                }
            }}
            onDrop={(e) => {
                e.preventDefault()
                onDrop(e)
            }}
        >
            <AnimatePresence>
                {outline.map((card, index) => (
                    <React.Fragment key={card.id}>
                        <Card
                            onDragOver={(e) => onDragOver(e, index)}
                            card={card}
                            isEditing={editingCard === card.id}
                            isSelected={selectedCard === card.id}
                            editText={editText}
                            onEditChange={onEditChange}
                            onEditBlur={() => onCardUpdate(card.id, editText)}
                            onEditKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onCardUpdate(card.id, editText)
                                }
                            }}
                            onCardClick={() => onCardSelect(card.id)}
                            onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
                            onDeleteClick={() => onCardDelete(card.id)}
                            dragHandlers={{
                                onDragStart: (e) => ondragstart(e, card),
                                onDragEnd: onDragEnd,
                            }}
                            dragOverStyles={getDragOverStyles(index)}
                        />
                        <AddCardButton onAddCard={() => onAddCard(index)}/>
                    </React.Fragment>
                ))}
            </AnimatePresence>
        </motion.div>
    )
}

export default CardList