import { makeAutoObservable } from 'mobx';

type PicturesObjT = { [key: string]: string };

class PicturesStore {
    pictures: PicturesObjT = {};
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
