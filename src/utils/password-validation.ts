import {isNil} from 'lodash';

const minPasswordLength = 8;

export function validatePassword(password: string, isOptional: boolean): boolean {
  if (isNil(password) && isOptional) {
    return true;
  }

  if (typeof password !== 'string') {
    return false;
  }

  if (password.length < minPasswordLength) {
    return false;
  }

  const hasValidPattern =
    !isNil(password.match(RegExp('([a-z]|[A-Z])'))) &&
    !isNil(password.match(RegExp('([A-Z])|([!@#$&*_])'))) &&
    !isNil(password.match(RegExp('(\\d)')));

  return hasValidPattern;
}