import { makeAutoObservable } from 'mobx';
import { PodpisantT } from '../../types/typesSP';
import { selectPodpisantSp } from '../spsStore/select';

class ExportContractStore {
    podpisant: PodpisantT = {
        codeName: '',
        ru: {
            name: '',
            comment: '',
        },
        eng: {
            name: '',
            comment: '',
        },
        declination: '',
    };

    constructor() {
        makeAutoObservable(this);
    }

    setPodpisant(podpisant: string) {
        this.podpisant = selectPodpisantSp(podpisant);
    }
}

const exportContractStore = new ExportContractStore();
export default exportContractStore;
