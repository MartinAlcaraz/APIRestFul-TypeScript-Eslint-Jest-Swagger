/**
 * Show a message in console
 * @param message mensaje para la consola
 */
export const LogSuccess = (message: string): void => {
    console.log(`Success: ${message}`)
}

export const LogInfo = (message: string): void => {
    console.log(`Info: ${message}`)
}

export const LogWarning = (message: string): void => {
    console.log(`Warning: ${message}`)
}

export const LogError = (message: string): void => {
    console.log(`Error: ${message}`)
}
