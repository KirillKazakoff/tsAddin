// sp - dictionary (spravochnik)
// data already selected on init
import {
    ProductionNewT,
    SellersT,
    TransportT,
    ConsigneesT,
    VesselsT,
} from '../../types/typesSP';

class SpsStore {
    transport = {
        name: '',
        nameEng: '',
        id: '',
    };
    vessels: VesselsT = {};
    production: ProductionNewT = {};
    sellers: SellersT = {};
    consignees: ConsigneesT = {};

    setVessels(vessels: VesselsT) {
        this.vessels = vessels;
    }

    setTransport(transport: TransportT) {
        this.transport = transport;
    }

    setProduction(production: ProductionNewT) {
        this.production = production;
    }

    setSellers(sellers: SellersT) {
        this.sellers = sellers;
    }

    setConsignees(consignees: ConsigneesT) {
        this.consignees = consignees;
    }
}

const spsStore = new SpsStore();
export default spsStore;
