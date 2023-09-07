export const mySessionStorage = {
    setItem: (key: string, value: any) => {
        return 'sdfdsf' as any;
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key: string) => {
        return '' as any;
        // return JSON.parse(sessionStorage.getItem(key));
    },
};
