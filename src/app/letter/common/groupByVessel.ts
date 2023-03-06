import { TableRowT } from '../../types/types';
import letterFieldsStore from '../../stores/letterStore/letterFieldsStore';

export const groupByVessel = (vessels: string[], table: TableRowT[]) => {
    const checkOperation = ({ operation, product }: TableRowT) => {
        const { terms, isExport } = letterFieldsStore.fields;

        if (operation === 'Внутренний рынок' && !isExport) {
            return true;
        }

        if (!isExport) return false;

        if (operation === 'Экспорт' && terms === 'CFR') {
            return true;
        }
        if (operation === 'Хранение на экспорт' && terms === 'EXW') {
            return true;
        }
        return false;
    };

    return vessels.reduce<TableRowT[][]>((groupVessel, vessel) => {
        const group = table.reduce<TableRowT[]>((total, row) => {
            if (!checkOperation(row)) return total;

            if (vessel === row.vessel) total.push(row);
            return total;
        }, []);

        if (group.length > 0) {
            groupVessel.push(group);
        }

        return groupVessel;
    }, []);
};
