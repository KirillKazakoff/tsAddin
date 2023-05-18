/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { initPodpisant, initPortRu } from '../initStoreObjects';
import { selectPodpisantSp, selectPortRuSp } from '../spsStore/select';

export type CargoT = 'Покупатель' | 'Продавец' | '';

const initStore = () => {
    const mode = process.env.NODE_ENV;

    const initFields = {
        port: initPortRu(),
        podpisant: initPodpisant(),
        dateLetter: '',
        isCFR: true,
        cargoTo: {
            storage: <CargoT>'',
            auto: <CargoT>'',
        },
        storage: {
            from: '',
            to: '',
        },
        isPicturesActive: true,
    };
    const debugFields = {
        port: initPortRu(),
        podpisant: initPodpisant(),
        dateLetter: '12.12.23',
        isCFR: true,
        cargoTo: {
            storage: <CargoT>'Покупатель',
            auto: <CargoT>'Покупатель',
        },
        storage: {
            from: '14.12.23',
            to: '17.12.23',
        },
        isPicturesActive: true,
    };

    return mode === 'production' ? initFields : debugFields;
};

class PortLetterStore {
    constructor() {
        makeAutoObservable(this);
    }
    store = initStore();

    setField = {
        port: (value: string) => (this.store.port = selectPortRuSp(value)),
        podpisant: (value: string) => (this.store.podpisant = selectPodpisantSp(value)),
        dateLetter: (value: string) => (this.store.dateLetter = value),
        cargoTo: {
            storage: (value: CargoT) => (this.store.cargoTo.storage = value),
            auto: (value: CargoT) => (this.store.cargoTo.auto = value),
        },
        storage: {
            from: (value: string) => (this.store.storage.from = value),
            to: (value: string) => (this.store.storage.to = value),
        },
    };

    toggle = {
        pictures: () => (this.store.isPicturesActive = !this.store.isPicturesActive),
        CFR: () => (this.store.isCFR = !this.store.isCFR),
    };
}

export default new PortLetterStore();
