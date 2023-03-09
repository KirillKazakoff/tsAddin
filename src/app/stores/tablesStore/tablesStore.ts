import { TableRowT } from '../../types/types';

class TablesStore {
    mates = [];

    setMates(table: TableRowT[]) {
        this.mates = table;
    }
}

const tablesStore = new TablesStore();
export default tablesStore;
