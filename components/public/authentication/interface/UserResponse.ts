export interface UserResponse {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    roles: string[],
    token: string
}