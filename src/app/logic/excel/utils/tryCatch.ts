import { unknownError } from '../../../stores/pageStatusStore.ts/pageMessages';
import pageStatusStore from '../../../stores/pageStatusStore.ts/pageStatusStore';

type UnknownFnT = (...args: any) => any;

export function tryCatch<FnT extends UnknownFnT>(callback: FnT): ReturnType<FnT> {
    try {
        return callback();
    } catch (e) {
        pageStatusStore.setPageStatus(unknownError(e.message));
        return null;
    }
}
