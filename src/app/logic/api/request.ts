import { RequestObjT } from '../../types/typesUtils';

const baseUrl = 'http://localhost:9092/pdf';
// const baseUrl = 'https://todos-mobx.cyclic.app/users';

export function timeoutMock(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve('ok'), timeout);
    });
}

export const request = async (reqObj?: RequestObjT) => {
    const url = reqObj?.url ? `${baseUrl}/${reqObj.url}` : baseUrl;
    const settings = reqObj?.settings || {
        method: 'GET',
    };

    // settings.headers = {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    // };

    try {
        await timeoutMock(600);

        const res = await fetch(url, settings);
        if (!res.ok) throw new Error(res.statusText);

        const resData = await res.json();
        if (resData.error) throw new Error(resData.error);
        return resData;
    } catch (e) {
        // if (e.message === 'Failed to fetch') {
        // console.log('Fai')
        // pageStatusStore.setConnectionLost();
        // }
        throw new Error(e.message as string);
    }
};
