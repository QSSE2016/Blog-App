// For API Requests
export type LoginRequest = {
    username: string,
    password: string
}

export type SignUpRequest = {
    username: string,
    email: string,
    password: string
}

export type BlogRequest = {
    id: number,
    name: string
}

export type EditCreateBlogRequest = {
    originalTitle: string,
    title: string,
    description: string,
    authorName: string,
    authorId: number
}

// The way i represent Users in front-end. 
export type User = {
    username: string,
    email: string,
    id: number
}

// The way i represent blogs in front-end
export type Blog = {
    id: number,
    authorId: number
    title: string,
    description: string,
    authorName: string,
}

export enum EDIT_MODE {
    CREATE,
    EDIT
}