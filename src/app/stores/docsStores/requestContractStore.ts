/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { initPortRu, initPortTamozhnya } from '../initStoreObjects';
import { selectPortRu, selectPortTamozhnyaSp } from '../spsStore/select';

class RequestContractStore {
    terms = '';
    portTamozhnya = initPortTamozhnya();
    portRu = initPortRu();

    constructor() {
        makeAutoObservable(this);
    }

    setField = {
        terms: (value: string) => (this.terms = value),
        portTamozhnya: (value: string) => (this.portTamozhnya = selectPortTamozhnyaSp(value)),
        portRu: (value: string) => (this.portRu = selectPortRu(value)),
    };
}

const requestContractStore = new RequestContractStore();
export default requestContractStore;
