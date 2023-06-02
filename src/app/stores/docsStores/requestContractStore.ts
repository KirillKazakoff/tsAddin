/* eslint-disable no-return-assign */
import { makeAutoObservable } from 'mobx';
import { initPortRu, initPortTamozhnya } from '../initStoreObjects';
import { selectSp } from '../spsStore/select';
import { PortRuT, PortTamozhnyaT } from '../../types/typesSP';
import { FormValuesT } from '../../types/typesUtils';

type RequestContractStoreT = {
    terms: string;
    portTamozhnya: PortTamozhnyaT;
    portRu: PortRuT;
};

class RequestContractStore {
    fields: RequestContractStoreT = {
        terms: '',
        portTamozhnya: initPortTamozhnya(),
        portRu: initPortRu(),
    };

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormValuesT<RequestContractStoreT>) {
        this.fields.terms = values.terms;
        this.fields.portTamozhnya = selectSp.portTamozhnya(values.portTamozhnya);
        this.fields.portRu = selectSp.portRu(values.portRu);
    }
}

const requestContractStore = new RequestContractStore();
export default requestContractStore;
