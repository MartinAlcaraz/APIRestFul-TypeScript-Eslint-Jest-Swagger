/* eslint-disable @typescript-eslint/consistent-type-definitions */
/**
 * Basic JSON response for controllers
 */
export type BasicResponse = {
    message: string
}

/**
 * Error JSON response for controllers
 */
export type ErrorResponse = {
    status: number,
    message: string,
    error: string
}

/**
 * Auth JSON response for controllers
 */
export type AuthResponse = {
    status: number,
    message: string,
    token: string
}
