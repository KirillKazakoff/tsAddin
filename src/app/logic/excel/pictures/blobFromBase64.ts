import { unknownError } from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';

export const blobFromBase64 = (base64String: string) => {
    try {
        const byteArray = Uint8Array.from(
            window
                .atob(base64String)
                .split('')
                .map((char) => char.charCodeAt(0)),
        );
        return new Blob([byteArray]);
    } catch (e) {
        pageStatusStore.setPageStatus(unknownError(e.message));
        return false;
    }
};
