import { UserType } from './../types/User';
const accessToken = "token";
const refreshToken = "refreshToken";
interface TokenDataType extends UserType {
    exp?: number,
    iat?: number,
    isActivated?: boolean,
    role?: string,
    type?: string,
}
export const setAccessToken: (token: string) => void = (token) => localStorage.setItem(accessToken, token);
export const setRefreshToken: (token: string) => void = (token) => localStorage.setItem(refreshToken, token);
export const getAccessToken: () => string | null = () => localStorage.getItem(accessToken);
export const getRefreshToken: () => string | null = () => localStorage.getItem(refreshToken);
export const deleteAccessToken: () => void = () => localStorage.removeItem(accessToken);
export const deleteRefreshToken: () => void = () => localStorage.removeItem(refreshToken);
export const getDataFromToken: (token: string) => TokenDataType = (token) => {
    if (token) return JSON.parse(atob(token.split(".")[1]));
    return null;
}
export const getUserDataFromToken: (token: string) => UserType = (token: string) => {
    const data: TokenDataType = getDataFromToken(token);
    delete data.iat;
    delete data.exp;
    delete data.isActivated;
    delete data.role;
    delete data.type;
    const result: UserType = data;
    return result;
}