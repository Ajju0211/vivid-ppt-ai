

export interface Slide {
    id: string
    slideName: string
    type: string
    content: ContentItem
    slideOrder: number
    className?: string
}

export type ContentType = 
    | 'column'
    | 'resizable-column'
    | 'text'
    | 'paragraph'
    | 'image'
    | 'table'
    | 'multiColumn'
    | 'blank'
    | 'imageAndText'
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'title'
    | 'heading4'
    | 'table'
    | 'blockquote'
    | 'numberedList'
    | 'bulletedList'
    | 'code'
    | 'link'
    | 'divider'
    | 'quote'
    | 'calloutBox'
    | 'todoList'
    | 'bulletList'
    | 'codeBlock'
    | 'customButton'
    | 'table'
    | 'tableOfContents'
export interface ContentItem {
    id: string
    type: ContentType
    name: string
    content: ContentItem[] | string | string[] | string[]
    initialRow?: number
    initialColumns?: number
    restrictToDrop?: boolean
    columns: number
    placehoder: string
    className: string
    alt?: string
    callOutType?: 'success' | 'warning' | 'info' | 'question' | 'caution'
    link?: string
    code?: string
    language?: string
    bgColor?: string
    isTransparent?: boolean
}

export interface Theme {
    name: string;
    fontFamily: string;
    fontColor: string;
    backgroundColor: string;
    slidesBackgroundColor: string;
    accentColor: string;
    gradientBackground?: string;
    slidebarColor?: string;
    navbarColor: string;
    type: "light" | "dark"
}