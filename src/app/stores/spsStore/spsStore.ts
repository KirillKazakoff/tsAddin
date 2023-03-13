// sp - dictionary (spravochnik)
// data already selected on init
import {
    ProductionNewT,
    SellersT,
    TransportT,
    VesselT,
    ConsigneesT,
} from '../../types/typesSP';

class SpsStore {
    transport = {
        name: '',
        nameEng: '',
        id: '',
    };
    vessels: VesselT[] = [];
    production: ProductionNewT = {};
    sellers: SellersT = {};
    consignees: ConsigneesT = {};

    setVessels(vessels: VesselT[]) {
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
