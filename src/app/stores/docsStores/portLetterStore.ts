/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { initPodpisant, initPortRu } from '../initStoreObjects';
import { selectSp } from '../spsStore/select';
import { FormValuesT } from '../../types/typesUtils';

export type CargoT = 'Покупатель' | 'Продавец' | '';

const initStore = () => {
    const initFields = {
        portRu: initPortRu(),
        podpisant: initPodpisant(),
        dateLetter: '',
        isCFR: true,
        cargoToStorage: '',
        cargoToAuto: '',
        storageFrom: '',
        storageTo: '',
        isPictures: true,
    };
    return initFields;
};

type PortLetterFieldsT = FormValuesT<ReturnType<typeof initStore>>;

class PortLetterStore {
    constructor() {
        makeAutoObservable(this);
    }
    fields = initStore();

    setFields(values: PortLetterFieldsT) {
        this.fields.portRu = selectSp.portRu(values.portRu);
        this.fields.podpisant = selectSp.podpisant(values.podpisant);
        this.fields.dateLetter = values.dateLetter;
        this.fields.cargoToStorage = values.cargoToStorage;
        this.fields.cargoToAuto = values.cargoToAuto;
        this.fields.storageFrom = values.storageFrom;
        this.fields.storageTo = values.storageTo;
        this.fields.isPictures = values.isPictures;
        this.fields.isCFR = values.isCFR;
    }
}

export default new PortLetterStore();
