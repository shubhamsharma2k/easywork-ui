export const getBearerToken = (): string => {
    const token = localStorage.getItem('token')
    return token ? token : ''
}
