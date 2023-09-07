export const mySessionStorage = {
    setItem: (key: string, value: any) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key: string) => {
        return JSON.parse(sessionStorage.getItem(key));
    },
};
