import { makeAutoObservable } from 'mobx';
import { initPodpisant } from '../initStoreObjects';
import { selectPodpisantSp } from '../spsStore/select';

class ExportContractStore {
    podpisant = initPodpisant();

    constructor() {
        makeAutoObservable(this);
    }

    setPodpisant(podpisant: string) {
        this.podpisant = selectPodpisantSp(podpisant);
    }
}

const exportContractStore = new ExportContractStore();
export default exportContractStore;
