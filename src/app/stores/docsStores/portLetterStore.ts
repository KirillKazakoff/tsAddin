/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { initPodpisant, initPortRu } from '../initStoreObjects';
import { selectSp } from '../spsStore/select';
import { FormValuesT } from '../../types/typesUtils';
import { TermsT } from '../../types/typesTables';

export type CargoT = 'Покупатель' | 'Продавец' | '';

const initFields = () => ({
    portRu: initPortRu(),
    podpisant: initPodpisant(),
    dateLetter: '',
    isPictures: true,
    termsPort: <TermsT>'',
    cargoToStorage: '',
    cargoToAuto: '',
    storageFrom: '',
    storageTo: '',
    personDischarge: '',
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class PortLetterStore {
    constructor() {
        makeAutoObservable(this);
    }
    fields = initFields();

    setFields(values: FormFieldsT) {
        this.fields.portRu = selectSp.portRu(values.portRu);
        this.fields.podpisant = selectSp.podpisant(values.podpisant);
        this.fields.dateLetter = values.dateLetter;
        this.fields.cargoToStorage = values.cargoToStorage;
        this.fields.cargoToAuto = values.cargoToAuto;
        this.fields.storageFrom = values.storageFrom;
        this.fields.storageTo = values.storageTo;
        this.fields.isPictures = values.isPictures;
        this.fields.personDischarge = values.personDischarge;
        this.fields.termsPort = values.termsPort as TermsT;
    }
}

export default new PortLetterStore();
