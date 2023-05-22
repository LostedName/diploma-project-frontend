import { isNil } from 'lodash';
import moment from 'moment';
export enum TokenType {
    Access = "accessToken",
    ConfirmEmail = "confirmEmailToken",
    TwoFactorAuth = "twoFactorAuthToken",
    Refresh = "refreshToken",
}
interface TokenData {
    exp?: number,
    iat?: number,
    isActivated?: boolean,
    role?: string,
    type?: string,
}
export const setToken: (token: string, type: TokenType) => void = (token, type) => localStorage.setItem(type, token);
export const getToken: (type: TokenType) => string | null = (type: TokenType) => localStorage.getItem(type);
export const deleteToken: (type: TokenType) => void = (type: TokenType) => localStorage.removeItem(type);
export const getDataFromToken: (token: string) => TokenData = (token) => {
    const tokenDataPart = token?.split(".")?.[1];
    if (isNil(tokenDataPart)) {
      return null;
    }
    const payload = JSON.parse(Buffer.from(tokenDataPart, 'base64').toString());
    return payload;
}
export function checkExpirationDate(token: string): boolean {
    const tokenDataPart = token?.split('.')?.[1];
    if (isNil(tokenDataPart)) {
        return false;
    }
    const buffer = atob(tokenDataPart);
    const payload = JSON.parse(buffer.toString());
    
    const exp = moment.unix(payload.exp); //expiration tiem
    const now = moment(); //current time
    
    const diff = exp.diff(now);
    return diff > 0;
  }