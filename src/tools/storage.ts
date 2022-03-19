export const getFromLocal = (key: string) => localStorage.getItem(key);
export const setInLocal = (key: string, value: any) => localStorage.setItem(key, value);
export const removeFromLocal = (key: string) => localStorage.removeItem(key);

export const getFromSession = (key: string) => sessionStorage.getItem(key);
export const setInSession = (key: string, value: any) => sessionStorage.setItem(key, value);
export const removeFromSession = (key: string) => sessionStorage.removeItem(key);