import { TableRowT } from '../../types/types';
import letterFieldsStore from '../../stores/letterStore/letterFieldsStore';

export const groupByVessel = (vessels: string[], table: TableRowT[]) => {
    const checkOperation = ({ operation, product }: TableRowT) => {
        const { terms, isExport } = letterFieldsStore.fields;

        console.log(operation, terms, isExport, product);
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
            checkOperation(row);

            if (vessel === row.vessel) total.push(row);
            return total;
        }, []);

        groupVessel.push(group);
        return groupVessel;
    }, []);
};
