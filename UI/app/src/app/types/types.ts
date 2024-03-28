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

// The way i represent Users in front-end. (doesnt have salt and password stored cause they are not needed)
export type User = {
    username: string,
    email: string,
    id: number
}