/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { initPortRu, initPortTamozhnya } from '../initStoreObjects';
import { selectSp } from '../spsStore/select';

class RequestContractStore {
    terms = '';
    portTamozhnya = initPortTamozhnya();
    portRu = initPortRu();

    constructor() {
        makeAutoObservable(this);
    }

    setField = {
        terms: (value: string) => (this.terms = value),
        portTamozhnya: (value: string) => (this.portTamozhnya = selectSp.portTamozhnya(value)),
        portRu: (value: string) => (this.portRu = selectSp.portRu(value) || initPortRu()),
    };
}

const requestContractStore = new RequestContractStore();
export default requestContractStore;
