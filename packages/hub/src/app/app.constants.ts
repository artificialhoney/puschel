export const ADMIN_ID = 0;
export const ADMIN_USERNAME = 'admin';

export const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
