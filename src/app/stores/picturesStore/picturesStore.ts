import { makeAutoObservable } from 'mobx';

class PicturesStore {
    pictures = {
        Seal_KTI: '',
        Seal_TRK: '',
        Seal_MSI: '',

        Sign_KOTOVMN: '',
        Sign_KOTOVNM: '',
        Sign_KRUZINAMN: '',
        Sign_KUZMENKOEA: '',
        Sign_SOJI: '',
        Sign_OCEANIC: '',
        Sign_CHANGRUN: '',
    };

    isPicturesFound = true;

    constructor() {
        makeAutoObservable(this);
    }

    setBase64(key: string, base64: string) {
        this.pictures[key] = base64;
    }
    setIsPicturesFound(value: boolean) {
        this.isPicturesFound = value;
    }
}

const picturesStore = new PicturesStore();
export type PictureKey = keyof typeof picturesStore.pictures | '';

export default picturesStore;
