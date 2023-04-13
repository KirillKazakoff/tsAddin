/* eslint-disable no-return-assign */
import { initPodpisant, initPortRu } from '../initStoreObjects';
import { selectPodpisantSp, selectPortRu } from '../spsStore/select';

export type CargoT = 'Покупатель' | 'Продавец' | '';

class PortLetterStore {
    store = {
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
    };

    setField = {
        port: (value: string) => (this.store.port = selectPortRu(value)),
        podpisant: (value: string) => (this.store.podpisant = selectPodpisantSp(value)),
        dateLetter: (value: string) => (this.store.dateLetter = value),
        isCFR: (value: boolean) => (this.store.isCFR = value),
        cargoTo: {
            storage: (value: CargoT) => (this.store.cargoTo.storage = value),
            auto: (value: CargoT) => (this.store.cargoTo.auto = value),
        },
        storage: {
            from: (value: string) => (this.store.storage.from = value),
            to: (value: string) => (this.store.storage.to = value),
        },
    };
}

export default new PortLetterStore();
