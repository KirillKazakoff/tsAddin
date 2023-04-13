import { makeAutoObservable } from 'mobx';
import { PortRuT, PortTamozhnyaT } from '../../types/typesSP';
import { selectPortRu, selectPortTamozhnyaSp } from '../spsStore/select';

class RequestContractStore {
    terms = '';
    portTamozhnya: PortTamozhnyaT = {
        codeName: '',
        eng: { name: '' },
        ru: { name: '' },
    };
    portRu: PortRuT = {
        codeName: '',
        director: '',
        mail: '',
        name: '',
        phone: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    setTerms(value: string) {
        this.terms = value;
    }

    setPortTamozhnya(value: string) {
        this.portTamozhnya = selectPortTamozhnyaSp(value);
    }

    setPortRu(value: string) {
        this.portRu = selectPortRu(value);
    }
}

const requestContractStore = new RequestContractStore();
export default requestContractStore;
