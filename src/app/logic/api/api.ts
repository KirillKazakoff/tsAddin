import { request } from './request';

// sendXls
type FetchXlsT = (file: FormData) => Promise<void>;
export const fetchSendXls: FetchXlsT = async (file) => {
    await request({
        settings: {
            method: 'POST',
            body: file,
        },
    });
};

export const fetchGetPdf = async (fileName: string) => {
    return request({ url: fileName });
};
