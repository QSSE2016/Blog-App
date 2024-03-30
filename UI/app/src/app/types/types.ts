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