export default (token: string | null): boolean => typeof token === 'string' && token?.length > 0;
