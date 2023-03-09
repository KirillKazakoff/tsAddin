import { MateRowT, ExportRowT } from '../../types/typesTables';

class TablesStore {
    mates = [];
    export = [];

    setMates(table: MateRowT[]) {
        this.mates = table;
    }

    setExport(table: ExportRowT[]) {
        this.export = table;
    }
}

const tablesStore = new TablesStore();
export default tablesStore;
