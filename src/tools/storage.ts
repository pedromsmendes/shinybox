export const getFromLocal = (key: string) => localStorage.getItem(key);
export const setInLocal = (key: string, value: any) => localStorage.setItem(key, value);

export const getFromSession = (key: string) => sessionStorage.getItem(key);
export const setInSession = (key: string, value: any) => sessionStorage.setItem(key, value);