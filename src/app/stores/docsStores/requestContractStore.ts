import { makeAutoObservable } from 'mobx';
import { PortTamozhnyaT } from '../../types/typesSP';
import { selectPortTamozhnyaSp } from '../spsStore/select';

class RequestContractStore {
    terms = '';
    port: PortTamozhnyaT = {
        codeName: '',
        eng: { name: '' },
        ru: { name: '' },
    };

    constructor() {
        makeAutoObservable(this);
    }

    setTerms(terms: string) {
        this.terms = terms;
    }

    setPort(port: string) {
        this.port = selectPortTamozhnyaSp(port);
    }
}

const requestContractStore = new RequestContractStore();
export default requestContractStore;
