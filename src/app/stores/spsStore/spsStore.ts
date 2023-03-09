// sp - dictionary (spravochnik)
// data already selected on init
import { ProductionNewT, TransportT, VesselT } from '../../types/typesSP';

class SpsStore {
    transport = {
        name: '',
        nameEng: '',
        id: '',
    };
    vessels: VesselT[] = [];
    production: ProductionNewT = {};

    setVessels(vessels: VesselT[]) {
        this.vessels = vessels;
    }

    setTransport(transport: TransportT) {
        this.transport = transport;
    }

    setProduction(production: ProductionNewT) {
        this.production = production;
    }
}

const spsStore = new SpsStore();
export default spsStore;
