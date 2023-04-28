import { makeAutoObservable } from 'mobx';

export type PictureKey =
    | 'Seal_KTI'
    | 'Seal_TRK'
    | 'Seal_MSI'
    | 'Sign_KOTOVMN'
    | 'Sign_KOTOVNM'
    | 'Sign_KRUZINAMN'
    | 'Sign_SOJI';

type PicturesObjT = { [Key in PictureKey]: string };

class PicturesStore {
    pictures: PicturesObjT = {
        Seal_KTI: '',
        Seal_TRK: '',
        Seal_MSI: '',

        Sign_KOTOVMN: '',
        Sign_KOTOVNM: '',
        Sign_SOJI: '',
        Sign_KRUZINAMN: '',
    };
    picture: string;

    constructor() {
        makeAutoObservable(this);
    }

    setBase64(key: string, base64: string) {
        this.pictures[key] = base64;
    }

    setPicture(base64: string) {
        this.picture = base64;
    }
}

const picturesStore = new PicturesStore();
export default picturesStore;
