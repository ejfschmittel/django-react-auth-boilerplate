const TOKEN_NAME = "jwt_token"
const TOKEN_REFRESH_DELTA = 60 * 10  // 10min

export const getJWTToken = () => localStorage.getItem(TOKEN_NAME)
export const setJWTToken = (token) => localStorage.setItem(TOKEN_NAME, token)
export const removeJWTToken = () => localStorage.removeItem(TOKEN_NAME)


export const decodeJwt = (token) => {
    if(!token) return null
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
  
// return boolean 
export const isAliveToken = (decodedToken) => {
    if(!decodedToken) return false
    const now = Date.now().valueOf() / 1000

    if (typeof decodedToken.exp !== 'undefined' && decodedToken.exp < now) 
        return false
    return true
}
  
// returns boolean indicating if the token should refresh given a certain timeframe and the token expiration date
export const shouldRefreshToken = (decodedToken) => {
    if(!decodedToken) return false
    const now = Date.now().valueOf() / 1000

    if (typeof decodedToken.exp !== 'undefined' && decodedToken.exp < now + TOKEN_REFRESH_DELTA) 
        return true
    return false
}